"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInTemplate = exports.InputType = void 0;
const Action_1 = require("../../interfaces/Action");
const Template_1 = require("../Template");
const CarPlay_1 = require("../../CarPlay");
var InputType;
(function (InputType) {
    InputType[InputType["DEFAULT"] = 1] = "DEFAULT";
    InputType[InputType["PASSWORD"] = 2] = "PASSWORD";
})(InputType = exports.InputType || (exports.InputType = {}));
class SignInTemplate extends Template_1.Template {
    config;
    get type() {
        return 'signin';
    }
    pressableCallbacks = {};
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
        const callbackFn = ({ error } = {}) => {
            error && console.error(error);
        };
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
    get eventMap() {
        return {
            backButtonPressed: 'onBackButtonPressed',
            didSignIn: 'onSignIn',
        };
    }
}
exports.SignInTemplate = SignInTemplate;
