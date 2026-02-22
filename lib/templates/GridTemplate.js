"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridTemplate = void 0;
const Template_1 = require("./Template");
class GridTemplate extends Template_1.Template {
    get type() {
        return 'grid';
    }
    get eventMap() {
        return {
            gridButtonPressed: 'onButtonPressed',
            backButtonPressed: 'onBackButtonPressed',
        };
    }
}
exports.GridTemplate = GridTemplate;
