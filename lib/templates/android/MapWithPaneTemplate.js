"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapWithPaneTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
/**
 * A template for showing a pane on top of a map
 * recommended to use in conjunction with a NavigationTemplate
 */
class MapWithPaneTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    config;
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.MapWithPane;
    }
    constructor(config) {
        super(config);
        this.config = config;
    }
}
exports.MapWithPaneTemplate = MapWithPaneTemplate;
