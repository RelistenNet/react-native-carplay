"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cluster = void 0;
const react_native_1 = require("react-native");
class Cluster {
    bridge;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    subscriptions = {};
    clusterIds = new Set();
    /**
     * @returns ids of all connected clusters
     */
    getClusterIds() {
        return [...this.clusterIds];
    }
    constructor(bridge, emitter) {
        this.bridge = bridge;
        emitter.addListener('clusterDidDisconnect', (e) => {
            this.subscriptions[e.id]?.onDisconnect?.();
            this.clusterIds.delete(e.id);
        });
        emitter.addListener('clusterDidChangeCompassSetting', e => {
            const { id, compassSetting } = e;
            this.subscriptions[id]?.onDidChangeCompassSetting?.(compassSetting);
        });
        emitter.addListener('clusterDidChangeSpeedLimitSetting', e => {
            const { id, speedLimitSetting } = e;
            this.subscriptions[id]?.onDidChangeSpeedLimitSetting?.(speedLimitSetting);
        });
        emitter.addListener('clusterDidZoomIn', e => {
            this.subscriptions[e.id]?.onZoomIn?.();
        });
        emitter.addListener('clusterDidZoomOut', e => {
            this.subscriptions[e.id]?.onZoomOut?.();
        });
        emitter.addListener('clusterWindowDidConnect', e => {
            const { id, ...rest } = e;
            this.subscriptions[id]?.onWindowDidConnect?.(rest);
        });
        emitter.addListener('clusterContentStyleDidChange', e => {
            const { id, ...rest } = e;
            this.subscriptions[id]?.onContentStyleDidChange?.(rest);
        });
        emitter.addListener('clusterStateDidChange', e => {
            const { id, isVisible } = e;
            this.subscriptions[id]?.onStateChanged?.(isVisible);
        });
    }
    create(config) {
        const { id, component, onDisconnect, onWindowDidConnect, onContentStyleDidChange, onStateChanged, } = config;
        const inactiveDescriptionVariants = 'inactiveDescriptionVariants' in config ? config.inactiveDescriptionVariants : [];
        const onDidChangeCompassSetting = 'onDidChangeCompassSetting' in config ? config.onDidChangeCompassSetting : undefined;
        const onDidChangeSpeedLimitSetting = 'onDidChangeSpeedLimitSetting' in config ? config.onDidChangeSpeedLimitSetting : undefined;
        const onZoomIn = 'onZoomIn' in config ? config.onZoomIn : undefined;
        const onZoomOut = 'onZoomOut' in config ? config.onZoomOut : undefined;
        this.subscriptions[id] = {
            onDisconnect,
            onDidChangeCompassSetting,
            onDidChangeSpeedLimitSetting,
            onZoomIn,
            onZoomOut,
            onWindowDidConnect,
            onContentStyleDidChange,
            onStateChanged,
        };
        react_native_1.AppRegistry.registerComponent(id, () => component);
        this.clusterIds.add(id);
        if (react_native_1.Platform.OS === 'android') {
            // on Android Auto we have a clusters that are set up on native side only
            return;
        }
        const clusterConfig = {
            inactiveDescriptionVariants: inactiveDescriptionVariants.map(description => ({
                ...description,
                image: description.image ? react_native_1.Image.resolveAssetSource(description.image) : null,
            })),
        };
        this.bridge.initCluster(id, clusterConfig);
    }
    checkForConnection(id) {
        this.bridge.checkForClusterConnection(id);
    }
}
exports.Cluster = Cluster;
