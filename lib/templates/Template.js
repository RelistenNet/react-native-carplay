"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
const AndroidRenderTemplates_1 = require("../interfaces/AndroidRenderTemplates");
class Template {
    config;
    get type() {
        return 'unset';
    }
    id;
    listenerSubscriptions = [];
    get eventMap() {
        return {};
    }
    constructor(config) {
        this.config = config;
        if (config.id) {
            this.id = config.id;
        }
        if (!this.id) {
            this.id = `${this.type}-${Date.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        }
        const eventMap = {
            barButtonPressed: 'onBarButtonPressed',
            didAppear: 'onDidAppear',
            didDisappear: 'onDidDisappear',
            willAppear: 'onWillAppear',
            willDisappear: 'onWillDisappear',
            poppedToRoot: 'onPoppedToRoot',
            ...(this.eventMap || {}),
        };
        Object.entries(eventMap).forEach(([eventName, callbackName]) => {
            const subscription = CarPlay_1.CarPlay.emitter.addListener(eventName, e => {
                // stateDidChange is fired by the scene which does not know anything about the template id but affects only MapTemplate
                const isStateChangedEvent = eventName === 'stateDidChange';
                if (isStateChangedEvent) {
                    e = e.isVisible;
                }
                const isAlertDismissedEvent = eventName === 'didDismissNavigationAlert' || eventName === 'willShowNavigationAlert';
                const callback = (e.templateId === this.id || isStateChangedEvent || isAlertDismissedEvent) && callbackName in config
                    ? config[callbackName]
                    : null;
                if (callback == null || typeof callback !== 'function') {
                    return;
                }
                callback(e);
            });
            this.listenerSubscriptions.push(subscription);
        });
        // all these templates call createTemplate on their own
        const types = Object.values(AndroidRenderTemplates_1.AndroidRenderTemplates).concat(['list', 'signin', 'message']);
        if (!types.includes(this.type)) {
            const callbackFn = react_native_1.Platform.select({
                android: ({ error } = {}) => {
                    error && console.error(error);
                },
            });
            CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.parseConfig({ type: this.type, ...config }), callbackFn);
        }
    }
    updateTemplate = (config) => {
        this.config = this.parseConfig({ type: this.type, ...config });
        CarPlay_1.CarPlay.bridge.updateTemplate(this.id, this.config);
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseConfig(config) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function traverse(obj) {
            for (const key in obj) {
                if (obj[key] != null && typeof obj[key] === 'object') {
                    traverse(obj[key]);
                }
                if (key === 'image') {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                    obj[key] = react_native_1.Image.resolveAssetSource(obj[key]);
                }
            }
        }
        const result = JSON.parse(JSON.stringify(config));
        traverse(result);
        return result;
    }
    destroy() {
        this.listenerSubscriptions.forEach(listener => listener.remove());
        this.listenerSubscriptions = [];
    }
}
exports.Template = Template;
