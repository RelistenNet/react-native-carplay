"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutePreviewNavigationTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
/**
 * A template that supports showing a list of routes alongside a custom drawn map.
 * The list must have its ItemList.OnSelectedListener set, and the template must have its navigate action set (see setNavigateAction). These are used in conjunction to inform the app that:
 * - A route has been selected. The app should also highlight the route on the map surface.
 * - A navigate action has been triggered. The app should begin navigation using the selected route.
 * The template itself does not expose a drawing surface. In order to draw on the canvas, use setSurfaceCallback.
 * Template Restrictions In regards to template refreshes, as described in onGetTemplate, this template is considered a refresh of a previous one if:
 * - The previous template is in a loading state (see setLoading, or
 * - The template title has not changed, and the number of rows and the title (not counting spans) of each row between the previous and new ItemLists have not changed.
 * Note that specifically, this means the app should not use this template to continuously refresh the routes as the car moves.
 * In order to use this template your car app MUST declare that it uses the **androidx.car.app.NAVIGATION_TEMPLATES** permission in the manifest.
 */
class RoutePreviewNavigationTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.RoutePreview;
    }
}
exports.RoutePreviewNavigationTemplate = RoutePreviewNavigationTemplate;
