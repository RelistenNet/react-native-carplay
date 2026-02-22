"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trip = void 0;
const CarPlay_1 = require("../CarPlay");
/**
 * in case you do not pass an id on the config it will be auto generated.
 * make sure to keep a reference since it is required for startNavigationSession, updateTravelEstimatesForTrip, showTripPreviews, showTripPreview, showRouteChoicesPreviewForTrip
 */
class Trip {
    id;
    constructor(config) {
        if (config.id) {
            this.id = config.id;
        }
        if (!this.id) {
            this.id = `trip-${Date.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
        }
        CarPlay_1.CarPlay.bridge.createTrip(this.id, config);
    }
}
exports.Trip = Trip;
