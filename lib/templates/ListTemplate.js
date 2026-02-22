"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListTemplate = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
const Action_1 = require("../interfaces/Action");
const Template_1 = require("./Template");
/**
 * A hierarchical list of menu items can be displayed on the CarPlay screen using a list template.
 *
 * The List Template allows navigation apps to present a hierarchical list of menu items. It includes a navigation bar and a list view.
 *
 * The navigation bar includes a title, and up to two (2) leading buttons and two (2) trailing buttons. You can customize the appearance of these buttons with icons or text.
 *
 * Each item in the list view may include an icon, title, subtitle, and an optional disclosure indicator indicating the presence of a submenu. The depth of the menu hierarchy may not exceed 5 levels. Note that some cars limit the total number of items that may be shown in a list.
 */
class ListTemplate extends Template_1.Template {
    config;
    get type() {
        return 'list';
    }
    get eventMap() {
        return {
            backButtonPressed: 'onBackButtonPressed',
        };
    }
    pressableCallbacks = {};
    constructor(config) {
        super(config);
        this.config = config;
        let subscription = CarPlay_1.CarPlay.emitter.addListener('didSelectListItem', (e) => {
            if (config.onItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onItemSelect(e)).then(() => {
                    if (react_native_1.Platform.OS === 'ios') {
                        CarPlay_1.CarPlay.bridge.reactToSelectedResult(true);
                    }
                });
            }
        });
        this.listenerSubscriptions.push(subscription);
        subscription = CarPlay_1.CarPlay.emitter.addListener('didSelectListItemRowImage', (e) => {
            if (config.onImageRowItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onImageRowItemSelect(e)).then(() => {
                    if (react_native_1.Platform.OS === 'ios') {
                        CarPlay_1.CarPlay.bridge.reactToSelectedResult(true);
                    }
                });
            }
        });
        this.listenerSubscriptions.push(subscription);
        subscription = CarPlay_1.CarPlay.emitter.addListener('buttonPressed', ({ buttonId, templateId }) => {
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
    updateSections = (sections) => {
        this.config = { ...this.config, sections };
        return CarPlay_1.CarPlay.bridge.updateListTemplateSections(this.id, super.parseConfig(sections));
    };
    updateListTemplateItem = (config) => {
        const { itemIndex: updateIndex, sectionIndex: updateSection, ...update } = config;
        this.config = {
            ...this.config,
            sections: this.config.sections?.map((section, index) => index === updateSection
                ? {
                    ...section,
                    items: section.items.map((item, itemIndex) => itemIndex === updateIndex ? update : item),
                }
                : section),
        };
        return CarPlay_1.CarPlay.bridge.updateListTemplateItem(this.id, super.parseConfig(config));
    };
    getMaximumListItemCount() {
        return CarPlay_1.CarPlay.bridge.getMaximumListItemCount(this.id);
    }
    getMaximumListSectionCount() {
        return CarPlay_1.CarPlay.bridge.getMaximumListSectionCount(this.id);
    }
    getMaximumListItemImageSize() {
        return CarPlay_1.CarPlay.bridge.getMaximumListItemImageSize(this.id);
    }
    getMaximumNumberOfGridImages() {
        return CarPlay_1.CarPlay.bridge.getMaximumNumberOfGridImages(this.id);
    }
    getMaximumListImageRowItemImageSize() {
        return CarPlay_1.CarPlay.bridge.getMaximumListImageRowItemImageSize(this.id);
    }
}
exports.ListTemplate = ListTemplate;
