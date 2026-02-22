"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointOfInterestTemplate = void 0;
const Template_1 = require("./Template");
class PointOfInterestTemplate extends Template_1.Template {
    get type() {
        return 'poi';
    }
    get eventMap() {
        return {
            didSelectPointOfInterest: 'onPointOfInterestSelect',
            didChangeMapRegion: 'onChangeMapRegion',
            backButtonPressed: 'onBackButtonPressed',
        };
    }
}
exports.PointOfInterestTemplate = PointOfInterestTemplate;
