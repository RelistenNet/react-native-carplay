"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactTemplate = void 0;
const Template_1 = require("./Template");
class ContactTemplate extends Template_1.Template {
    get type() {
        return 'contact';
    }
    get eventMap() {
        return {
            buttonPressed: 'onButtonPressed',
            backButtonPressed: 'onBackButtonPressed',
        };
    }
}
exports.ContactTemplate = ContactTemplate;
