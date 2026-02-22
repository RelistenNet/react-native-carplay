"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapWithListTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
const CarPlay_1 = require("../../CarPlay");
const react_native_1 = require("react-native");
/**
 * A template for showing a list on top of a map
 * recommended to use in conjunction with a NavigationTemplate
 */
class MapWithListTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    config;
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.MapWithList;
    }
    constructor(config) {
        super(config);
        this.config = config;
        const subscription = CarPlay_1.CarPlay.emitter.addListener('didSelectListItemRowImage', (e) => {
            if (config.onImageRowItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onImageRowItemSelect(e)).then(() => {
                    if (react_native_1.Platform.OS === 'ios') {
                        CarPlay_1.CarPlay.bridge.reactToSelectedResult(true);
                    }
                });
            }
        });
        this.listenerSubscriptions.push(subscription);
    }
}
exports.MapWithListTemplate = MapWithListTemplate;
