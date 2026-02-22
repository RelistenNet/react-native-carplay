"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionSheetTemplate = void 0;
const Template_1 = require("./Template");
class ActionSheetTemplate extends Template_1.Template {
    get type() {
        return 'actionsheet';
    }
    get eventMap() {
        return {
            actionButtonPressed: 'onActionButtonPressed',
        };
    }
}
exports.ActionSheetTemplate = ActionSheetTemplate;
