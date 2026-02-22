"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AndroidNavigationBaseTemplate = void 0;
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const Template_1 = require("../Template");
const CarPlay_1 = require("../../CarPlay");
const Action_1 = require("../../interfaces/Action");
class AndroidNavigationBaseTemplate extends Template_1.Template {
    config;
    get eventMap() {
        return {
            didShowPanningInterface: 'onDidShowPanningInterface',
            didDismissPanningInterface: 'onDidDismissPanningInterface',
            didUpdatePanGestureWithTranslation: 'onDidUpdatePanGestureWithTranslation',
            didUpdatePinchGesture: 'onDidUpdatePinchGesture',
            didPress: 'onDidPress',
            didCancelNavigation: 'onDidCancelNavigation',
            didEnableAutoDrive: 'onAutoDriveEnabled',
            didSelectListItem: 'onItemSelect',
            backButtonPressed: 'onBackButtonPressed',
            didDismissNavigationAlert: 'onDidDismissAlert',
            willShowNavigationAlert: 'onWillShowAlert',
        };
    }
    pressableCallbacks = {};
    constructor(config) {
        const { component, ...rest } = config;
        super(config);
        this.config = config;
        this.config = this.parseConfig({ type: this.type, ...rest, render: component != null });
        if (component) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const template = this;
            react_native_1.AppRegistry.registerComponent(this.id, () => props => React.createElement(component, { ...props, template: template }));
        }
        const subscription = CarPlay_1.CarPlay.emitter.addListener('buttonPressed', ({ buttonId }) => {
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
        CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.config, callbackFn);
    }
    parseConfig(config) {
        const callbackIds = [];
        const { actions, mapButtons, navigateAction, pane, buttons, ...rest } = config;
        const updatedPane = pane
            ? {
                ...pane,
                actions: pane?.actions?.map(action => {
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
                }),
            }
            : undefined;
        const updatedButtons = buttons
            ? buttons.map(button => {
                const id = button.id ?? (0, Action_1.getCallbackActionId)();
                callbackIds.push(id);
                if (!('onPress' in button)) {
                    return button;
                }
                const { onPress, ...buttonRest } = button;
                this.pressableCallbacks[id] = onPress;
                return { ...buttonRest, id };
            })
            : undefined;
        const updatedConfig = { ...rest, pane: updatedPane, buttons: updatedButtons };
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
        if (mapButtons) {
            updatedConfig.mapButtons = mapButtons.map(mapButton => {
                const id = 'id' in mapButton ? mapButton.id : (0, Action_1.getCallbackActionId)();
                if (id == null) {
                    return mapButton;
                }
                callbackIds.push(id);
                if (!('onPress' in mapButton)) {
                    return mapButton;
                }
                const { onPress, ...actionRest } = mapButton;
                this.pressableCallbacks[id] = onPress;
                return { ...actionRest, id };
            });
        }
        if (navigateAction) {
            const id = 'id' in navigateAction ? navigateAction.id : (0, Action_1.getCallbackActionId)();
            if (id != null) {
                callbackIds.push(id);
                if ('onPress' in navigateAction) {
                    const { onPress, ...actionRest } = navigateAction;
                    this.pressableCallbacks[id] = onPress;
                    updatedConfig.navigateAction = { ...actionRest, id };
                }
                else {
                    updatedConfig.navigateAction = navigateAction;
                }
            }
        }
        this.pressableCallbacks = Object.fromEntries(Object.entries(this.pressableCallbacks).filter(([id]) => callbackIds.includes(id)));
        return super.parseConfig(updatedConfig);
    }
}
exports.AndroidNavigationBaseTemplate = AndroidNavigationBaseTemplate;
