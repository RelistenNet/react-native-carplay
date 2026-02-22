"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Dashboard = void 0;
const react_native_1 = require("react-native");
class Dashboard {
    bridge;
    emitter;
    connected = false;
    window = null;
    onConnectCallbacks = new Set();
    onDisconnectCallbacks = new Set();
    stateSubscription = null;
    buttonSubscription = null;
    constructor(bridge, emitter) {
        this.bridge = bridge;
        this.emitter = emitter;
        this.emitter.addListener('dashboardDidConnect', (window) => {
            this.connected = true;
            this.window = window;
            this.onConnectCallbacks.forEach(callback => {
                callback(window);
            });
        });
        this.emitter.addListener('dashboardDidDisconnect', () => {
            this.connected = false;
            this.window = null;
            this.onDisconnectCallbacks.forEach(callback => {
                callback();
            });
        });
        // check if already connected this will fire any 'dashboardDidDisconnect' events
        // if a connected is already present.
        this.bridge.checkForDashboardConnection();
    }
    create(config) {
        for (const subscription of [this.stateSubscription, this.buttonSubscription]) {
            subscription?.remove();
        }
        const { id, component, shortcutButtons, onStateChanged } = config;
        if (shortcutButtons.length === 0 || shortcutButtons.length > 2) {
            throw new Error(`invalid number of dashboard shortcut buttons, got ${shortcutButtons.length} when it has to be a min of 1 and a max of 2`);
        }
        const dashboardConfig = {
            shortcutButtons: [],
        };
        if (shortcutButtons != null) {
            for (let index = 0; index < shortcutButtons.length; index++) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { onPress, ...button } = shortcutButtons[index];
                dashboardConfig.shortcutButtons.push({
                    ...button,
                    index,
                    image: react_native_1.Image.resolveAssetSource(button.image),
                    launchCarplayScene: button.launchCarplayScene ?? false,
                });
            }
            this.buttonSubscription = this.emitter.addListener('dashboardButtonPressed', e => {
                shortcutButtons[e.index]?.onPress?.();
            });
            if (onStateChanged != null) {
                this.stateSubscription = this.emitter.addListener('dashboardStateDidChange', ({ isVisible }) => {
                    onStateChanged(isVisible);
                });
            }
        }
        react_native_1.AppRegistry.registerComponent(id, () => component);
        this.bridge.createDashboard(id, dashboardConfig);
    }
    checkForConnection() {
        this.bridge.checkForDashboardConnection();
    }
    updateShortcutButtons(shortcutButtons) {
        const config = {
            shortcutButtons: [],
        };
        this.buttonSubscription?.remove();
        for (let index = 0; index < shortcutButtons.length; index++) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { onPress, ...button } = shortcutButtons[index];
            config.shortcutButtons.push({
                ...button,
                index,
                image: react_native_1.Image.resolveAssetSource(button.image),
                launchCarplayScene: button.launchCarplayScene ?? false,
            });
        }
        this.buttonSubscription = this.emitter.addListener('dashboardButtonPressed', e => {
            shortcutButtons[e.index]?.onPress?.();
        });
        this.bridge.updateDashboardShortcutButtons(config);
    }
    /**
     * Fired when CarPlay is connected to the dashboard scene.
     */
    registerOnConnect = (callback) => {
        this.onConnectCallbacks.add(callback);
        return {
            remove: () => this.onConnectCallbacks.delete(callback),
        };
    };
    /**
     * Fired when CarPlay is disconnected from the dashboard scene.
     */
    registerOnDisconnect = (callback) => {
        this.onDisconnectCallbacks.add(callback);
        return {
            remove: () => this.onDisconnectCallbacks.delete(callback),
        };
    };
}
exports.Dashboard = Dashboard;
