"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapWithGridTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
/**
 * A template for showing a list on top of a map
 * recommended to use in conjunction with a NavigationTemplate
 */
class MapWithGridTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.MapWithGrid;
    }
}
exports.MapWithGridTemplate = MapWithGridTemplate;
