"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageTemplate = void 0;
const CarPlay_1 = require("../../CarPlay");
const Action_1 = require("../../interfaces/Action");
const Template_1 = require("../Template");
const react_native_1 = require("react-native");
class MessageTemplate extends Template_1.Template {
    config;
    pressableCallbacks = {};
    get type() {
        return 'message';
    }
    constructor(config) {
        super(config);
        this.config = config;
        const subscription = CarPlay_1.CarPlay.emitter.addListener('buttonPressed', ({ buttonId, templateId }) => {
            if (templateId !== this.id) {
                return;
            }
            const callback = this.pressableCallbacks[buttonId];
            if (callback == null || typeof callback !== 'function') {
                return;
            }
            callback();
        });
        this.listenerSubscriptions.push(subscription);
        const callbackFn = react_native_1.Platform.select({
            android: ({ error } = {}) => {
                error && console.error(error);
            },
        });
        this.config = this.parseConfig({ type: this.type, ...config });
        CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.config, callbackFn);
    }
    parseConfig(config) {
        const { actions, ...rest } = config;
        const updatedConfig = rest;
        const callbackIds = [];
        if (actions != null) {
            updatedConfig.actions = actions.map(action => {
                const id = 'id' in action ? action.id : (0, Action_1.getCallbackActionId)();
                if (id == null) {
                    return action;
                }
                callbackIds.push(id);
                if (!('onPress' in action)) {
                    return action;
                }
                const { onPress, ...actionRest } = action;
                this.pressableCallbacks[id] = onPress;
                return { ...actionRest, id };
            });
        }
        this.pressableCallbacks = Object.fromEntries(Object.entries(this.pressableCallbacks).filter(([id]) => callbackIds.includes(id)));
        return super.parseConfig(updatedConfig);
    }
}
exports.MessageTemplate = MessageTemplate;
