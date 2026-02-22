"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarPlayCluster = exports.CarPlayDashboard = exports.CarPlay = exports.CarPlayInterface = void 0;
const react_native_1 = require("react-native");
const Dashboard_1 = require("./scenes/Dashboard");
const Cluster_1 = require("./scenes/Cluster");
const CarPlayHeadlessJsTask_1 = __importDefault(require("./CarPlayHeadlessJsTask"));
const Action_1 = require("./interfaces/Action");
const { RNCarPlay } = react_native_1.NativeModules;
/**
 * A controller that manages all user interface elements appearing on your map displayed on the CarPlay screen.
 */
class CarPlayInterface {
    /**
     * React Native bridge to the CarPlay interface
     */
    bridge = RNCarPlay;
    /**
     * Boolean to denote if carplay is currently connected.
     */
    connected = false;
    window;
    /**
     * CarPlay Event Emitter
     */
    emitter = new react_native_1.NativeEventEmitter(RNCarPlay);
    onTelemetryCallbacks = new Set();
    onConnectCallbacks = new Set();
    onDisconnectCallbacks = new Set();
    onClusterConnectCallbacks = new Set();
    onAppearanceDidChangeCallbacks = new Set();
    onOnSafeAreaInsetsDidChangeCallbacks = new Set();
    alertCallbacks = {};
    onVoiceCommandCallbacks = new Set();
    constructor() {
        (0, CarPlayHeadlessJsTask_1.default)();
        this.emitter.addListener('didConnect', (window) => {
            console.log('we are connected yes!');
            this.connected = true;
            this.window = window;
            this.onConnectCallbacks.forEach(callback => {
                callback(window);
            });
        });
        this.emitter.addListener('didDisconnect', () => {
            this.connected = false;
            this.window = undefined;
            this.onDisconnectCallbacks.forEach(callback => {
                callback();
            });
        });
        if (react_native_1.Platform.OS === 'android') {
            this.emitter.addListener('didPressMenuItem', e => {
                if (e?.title === 'Reload Android Auto') {
                    this.bridge.reload();
                }
            });
        }
        this.emitter.addListener('clusterControllerDidConnect', (props) => {
            this.onClusterConnectCallbacks.forEach(callback => callback(props));
        });
        this.emitter.addListener('appearanceDidChange', (props) => {
            this.onAppearanceDidChangeCallbacks.forEach(callback => callback(props));
        });
        this.emitter.addListener('safeAreaInsetsDidChange', (props) => {
            this.onOnSafeAreaInsetsDidChangeCallbacks.forEach(callback => callback(props));
        });
        if (react_native_1.Platform.OS === 'android') {
            this.emitter.addListener('telemetry', (telemetry) => {
                this.onTelemetryCallbacks.forEach(callback => callback(telemetry));
            });
            this.emitter.addListener('voiceCommand', (voiceCommand) => {
                this.onVoiceCommandCallbacks.forEach(callback => callback(voiceCommand));
            });
            this.emitter.addListener('didDismissNavigationAlert', ({ navigationAlertId }) => {
                this.cleanAlertCallbacks(navigationAlertId);
            });
        }
        this.emitter.addListener('buttonPressed', ({ buttonId, templateId }) => {
            if (templateId != null) {
                // we listen to alert actions only in here, these do not have a templateId
                return;
            }
            this.alertCallbacks[buttonId]?.callback?.();
        });
        // check if already connected this will fire any 'didConnect' events
        // if a connected is already present.
        if (react_native_1.Platform.OS === 'ios') {
            this.bridge.checkForConnection();
        }
    }
    /**
     * Silently checks permissions without requesting them from the user
     * @param requestedPermissions AndroidAutoPermissions you want to check
     * @returns
     */
    async checkAndroidAutoPermissions(requestedPermissions) {
        if (react_native_1.Platform.OS !== 'android') {
            return Promise.resolve(false);
        }
        const state = await Promise.all(requestedPermissions.map(permission => react_native_1.PermissionsAndroid.check(permission).catch(() => false)));
        return state.every(granted => granted);
    }
    /**
     * Shows a message template to the user asking for specific permissions
     * @param permissions Permissions to request from the user
     * @param message Message to show on the template
     * @param primaryAction Primary action that can be pressed while the car is parked only
     * @returns Promise in case permissions were granted or denied or null in case a back button was specified as headerAction and was pressed by the user
     * @namespace Android
     */
    async requestAndroidAutoPermissions(permissions, message, primaryAction, headerAction) {
        if (react_native_1.Platform.OS !== 'android') {
            // no-op on iOS
            return Promise.resolve(null);
        }
        return exports.CarPlay.bridge.requestPermissions(permissions, message, primaryAction, headerAction);
    }
    /**
     * Fired when CarPlay gets telemetry data from the car.
     * make sure to call CarPlay.requestTelemetryPermissions first
     * @namespace Android
     */
    registerTelemetryListener = (callback) => {
        if (react_native_1.Platform.OS !== 'android') {
            return Promise.reject('unsupported platform');
        }
        this.onTelemetryCallbacks.add(callback);
        return this.bridge.startTelemetryObserver();
    };
    /**
     * @param callback that was registered first using CarPlay.registerTelemetryListener
     * @namespace Android
     */
    unregisterTelemetryListener = (callback) => {
        if (react_native_1.Platform.OS !== 'android') {
            // no-op on iOS
            return;
        }
        this.onTelemetryCallbacks.delete(callback);
        if (this.onTelemetryCallbacks.size === 0) {
            this.bridge.stopTelemetryObserver();
        }
    };
    /**
     * @namespace Android
     * @param callback voice command handler
     */
    registerVoiceCommandListener = (callback) => {
        if (react_native_1.Platform.OS !== 'android') {
            throw new Error('unsupported platform');
        }
        this.onVoiceCommandCallbacks.add(callback);
    };
    /**
     * @namespace Android
     * @param callback voice command handler
     */
    unregisterVoiceCommandListener = (callback) => {
        if (react_native_1.Platform.OS !== 'android') {
            throw new Error('unsupported platform');
        }
        this.onVoiceCommandCallbacks.delete(callback);
    };
    /**
     * Fired when CarPlay is connected to the device.
     */
    registerOnConnect = (callback) => {
        this.onConnectCallbacks.add(callback);
    };
    unregisterOnConnect = (callback) => {
        this.onConnectCallbacks.delete(callback);
    };
    /**
     * Fired when CarPlay is disconnected from the device.
     */
    registerOnDisconnect = (callback) => {
        this.onDisconnectCallbacks.add(callback);
    };
    unregisterOnDisconnect = (callback) => {
        this.onDisconnectCallbacks.delete(callback);
    };
    registerOnClusterConnect = (callback) => {
        this.onClusterConnectCallbacks.add(callback);
        return {
            remove: () => {
                this.onClusterConnectCallbacks.delete(callback);
            },
        };
    };
    registerOnAppearanceDidChange = (callback) => {
        this.onAppearanceDidChangeCallbacks.add(callback);
        return {
            remove: () => {
                this.onAppearanceDidChangeCallbacks.delete(callback);
            },
        };
    };
    registerOnSafeAreaInsetsDidChange = (callback) => {
        this.onOnSafeAreaInsetsDidChangeCallbacks.add(callback);
        return {
            remove: () => {
                this.onOnSafeAreaInsetsDidChangeCallbacks.delete(callback);
            },
        };
    };
    /**
     * Sets the root template, starting a new stack for the template navigation hierarchy.
     * @param rootTemplate The root template. Replaces the current rootTemplate, if one exists.
     * @param animated Set TRUE to animate the presentation of the root template; ignored if there isn't a current rootTemplate.
     */
    setRootTemplate(rootTemplate, animated = true) {
        return this.bridge.setRootTemplate(rootTemplate.id, animated);
    }
    /**
     * Pushes a template onto the navigation stack and updates the display.
     * @param templateToPush The template to push onto the navigation stack.
     * @param animated Set TRUE to animate the presentation of the template.
     */
    pushTemplate(templateToPush, animated = true) {
        return this.bridge.pushTemplate(templateToPush.id, animated);
    }
    /**
     * Pops templates until the specified template is at the top of the navigation stack.
     * @param targetTemplate The template that you want at the top of the stack. The template must be on the navigation stack before calling this method.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popToTemplate(targetTemplate, animated = true) {
        return this.bridge.popToTemplate(targetTemplate.id, animated);
    }
    /**
     * Pops all templates on the stack—except the root template—and updates the display.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popToRootTemplate(animated = true) {
        return this.bridge.popToRootTemplate(animated);
    }
    /**
     * Pops the top template from the navigation stack and updates the display.
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    popTemplate(animated = true) {
        return this.bridge.popTemplate(animated);
    }
    /**
     * presents a presentable template, alert / action / voice
     * @param templateToPresent The presentable template to present
     * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    presentTemplate(templateToPresent, animated = true) {
        return this.bridge.presentTemplate(templateToPresent.id, animated);
    }
    /**
     * Dismisses the current presented template
     * * @param animated A Boolean value that indicates whether the system animates the display of transitioning templates.
     */
    dismissTemplate(animated = true) {
        return this.bridge.dismissTemplate(animated);
    }
    /**
     * The current root template in the template navigation hierarchy.
     */
    getRootTemplate() {
        return this.bridge.getRootTemplate();
    }
    /**
     * The top-most template in the navigation hierarchy stack.
     */
    getTopTemplate() {
        return this.bridge.getTopTemplate();
    }
    /**
     * Control now playing template state
     * @param enable A Boolean value that indicates whether the system use now playing template.
     */
    enableNowPlaying(enable = true) {
        return this.bridge.enableNowPlaying(enable);
    }
    /**
     * brings up an alert
     * @namespace Android
     */
    alert(alert) {
        const { actions, ...config } = alert;
        let duration = alert.duration;
        if (duration <= 0) {
            console.warn(`Duration should be a positive number, using 500ms instead of ${duration}ms`);
            duration = 500;
        }
        const updatedActions = actions?.map(action => {
            const id = (0, Action_1.getCallbackActionId)();
            const { onPress, ...rest } = action;
            this.alertCallbacks[id] = { alertId: alert.id, callback: onPress };
            return { ...rest, id };
        });
        exports.CarPlay.bridge.alert({ ...config, actions: updatedActions, duration });
    }
    /**
     * dismisses ongoing alert, no-op in case the alert is not shown anymore
     * @namespace Android
     */
    dismissAlert(id) {
        this.cleanAlertCallbacks(id);
        exports.CarPlay.bridge.dismissAlert(id);
    }
    notify(title, text, largeIcon) {
        const icon = largeIcon == null ? null : react_native_1.Image.resolveAssetSource(largeIcon);
        exports.CarPlay.bridge.notify(title, text, icon);
    }
    /**
     * @namespace Android
     */
    getPlayServicesAvailable() {
        return exports.CarPlay.bridge.getPlayServicesAvailable();
    }
    cleanAlertCallbacks(alertId) {
        this.alertCallbacks = Object.entries(this.alertCallbacks).reduce((acc, [alertCallbackId, alert]) => {
            if (alert.alertId !== alertId) {
                acc[alertCallbackId] = alert;
            }
            return acc;
        }, {});
    }
}
exports.CarPlayInterface = CarPlayInterface;
exports.CarPlay = new CarPlayInterface();
exports.CarPlayDashboard = new Dashboard_1.Dashboard(exports.CarPlay.bridge, exports.CarPlay.emitter);
exports.CarPlayCluster = new Cluster_1.Cluster(exports.CarPlay.bridge, exports.CarPlay.emitter);
