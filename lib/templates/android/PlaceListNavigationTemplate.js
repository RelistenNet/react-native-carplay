"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceListNavigationTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
/**
 * A template that supports showing a list of places alongside a custom drawn map.
 * The template itself does not expose a drawing surface. In order to draw on the canvas, use setSurfaceCallback.
 * Template Restrictions In regards to template refreshes, as described in onGetTemplate, this template is considered a refresh of a previous one if:
 * - The previous template is in a loading state (see setLoading, or
 * - The template title has not changed, and the number of rows and the title (not counting spans) of each row between the previous and new ItemLists have not changed.
 * - The template is sent in response to a user-initiated content refresh request. (see setOnContentRefreshListener.
 * In order to use this template your car app MUST declare that it uses the **androidx.car.app.NAVIGATION_TEMPLATES** permission in the manifest.
 */
class PlaceListNavigationTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.PlaceNavigationMap;
    }
}
exports.PlaceListNavigationTemplate = PlaceListNavigationTemplate;
