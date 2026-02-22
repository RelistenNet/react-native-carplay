"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationTemplate = void 0;
const AndroidRenderTemplates_1 = require("../../interfaces/AndroidRenderTemplates");
const AndroidNavigationBaseTemplate_1 = require("./AndroidNavigationBaseTemplate");
const CarPlay_1 = require("../../CarPlay");
/**
 * A template for showing navigation information.
 * This template has two independent sections which can be updated:
 * - Navigation information such as routing instructions or navigation-related messages.
 * - Travel estimates to the destination.
 */
class NavigationTemplate extends AndroidNavigationBaseTemplate_1.AndroidNavigationBaseTemplate {
    get type() {
        return AndroidRenderTemplates_1.AndroidRenderTemplates.Navigation;
    }
    navigationStarted() {
        return CarPlay_1.CarPlay.bridge.navigationStarted();
    }
    navigationEnded() {
        return CarPlay_1.CarPlay.bridge.navigationEnded();
    }
}
exports.NavigationTemplate = NavigationTemplate;
