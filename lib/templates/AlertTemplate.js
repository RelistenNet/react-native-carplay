"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlertTemplate = void 0;
const Template_1 = require("./Template");
class AlertTemplate extends Template_1.Template {
    get type() {
        return 'alert';
    }
    get eventMap() {
        return {
            actionButtonPressed: 'onActionButtonPressed',
        };
    }
}
exports.AlertTemplate = AlertTemplate;
