"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InformationTemplate = void 0;
const Template_1 = require("./Template");
const CarPlay_1 = require("../CarPlay");
class InformationTemplate extends Template_1.Template {
    get type() {
        return 'information';
    }
    get eventMap() {
        return {
            actionButtonPressed: 'onActionButtonPressed',
        };
    }
    updateInformationTemplateItems = (items) => {
        this.config.items = items;
        return CarPlay_1.CarPlay.bridge.updateInformationTemplateItems(this.id, this.parseConfig(items));
    };
    updateInformationTemplateActions = (actions) => {
        this.config.actions = actions;
        return CarPlay_1.CarPlay.bridge.updateInformationTemplateActions(this.id, this.parseConfig(actions));
    };
}
exports.InformationTemplate = InformationTemplate;
