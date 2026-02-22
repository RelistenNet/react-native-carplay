"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaneTemplate = void 0;
const Template_1 = require("../Template");
class PaneTemplate extends Template_1.Template {
    get type() {
        return 'pane';
    }
    get eventMap() {
        return {
            backButtonPressed: 'onBackButtonPressed',
            buttonPressed: 'onActionButtonPressed',
        };
    }
}
exports.PaneTemplate = PaneTemplate;
