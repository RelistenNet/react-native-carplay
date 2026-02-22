"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapTemplate = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
const Template_1 = require("./Template");
/**
 * The Map Template is a control layer that appears as an overlay over the base view and allows you to present user controls.
 *
 * The control layer consists of a navigation bar and map buttons. By default, the navigation bar appears when the user interacts with the app, and disappears after a period of inactivity.
 *
 * The navigation bar includes up to two leading buttons and two trailing buttons. You can customize the appearance of these buttons with icons or text.
 *
 * The control layer may also include up to four map buttons. The map buttons are always shown as icons.
 *
 * Navigation apps enter panning mode, zoom in or out, and perform other functions by responding to user actions on these buttons.
 */
class MapTemplate extends Template_1.Template {
    config;
    get type() {
        return 'map';
    }
    get eventMap() {
        return {
            alertActionPressed: 'onAlertActionPressed',
            willDismissNavigationAlert: 'onWillDismissNavigationAlert',
            didDismissNavigationAlert: 'onDidDismissNavigationAlert',
            willShowNavigationAlert: 'onWillShowNavigationAlert',
            didShowNavigationAlert: 'onDidShowNavigationAlert',
            mapButtonPressed: 'onMapButtonPressed',
            panWithDirection: 'onPanWithDirection',
            panBeganWithDirection: 'onPanBeganWithDirection',
            panEndedWithDirection: 'onPanEndedWithDirection',
            didBeginPanGesture: 'onDidBeginPanGesture',
            didUpdatePanGestureWithTranslation: 'onDidUpdatePanGestureWithTranslation',
            didEndPanGestureWithVelocity: 'onDidEndPanGestureWithVelocity',
            selectedPreviewForTrip: 'onSelectedPreviewForTrip',
            didCancelNavigation: 'onDidCancelNavigation',
            startedTrip: 'onStartedTrip',
            backButtonPressed: 'onBackButtonPressed',
            stateDidChange: 'onStateChanged',
        };
    }
    constructor(config) {
        super(config);
        this.config = config;
        if (config.component) {
            react_native_1.AppRegistry.registerComponent(this.id, () => config.component);
        }
        const callbackFn = react_native_1.Platform.select({
            android: ({ error } = {}) => {
                error && console.error(error);
            },
        });
        CarPlay_1.CarPlay.bridge.createTemplate(this.id, this.parseConfig({ type: this.type, ...config, render: true }), callbackFn);
    }
    /**
     * Begins guidance for a trip.
     *
     * Keep a reference to the navigation session to perform guidance updates.
     * @param trip Trip class instance
     */
    async startNavigationSession(trip) {
        return CarPlay_1.CarPlay.bridge.startNavigationSession(this.id, trip.id);
    }
    cancelNavigationSession() {
        return CarPlay_1.CarPlay.bridge.cancelNavigationSession();
    }
    finishNavigationSession() {
        return CarPlay_1.CarPlay.bridge.finishNavigationSession();
    }
    pauseNavigationSession(reason, description) {
        return CarPlay_1.CarPlay.bridge.pauseNavigationSession(reason, description);
    }
    updateManeuvers(maneuvers) {
        const windowScale = CarPlay_1.CarPlay.window?.scale || 1.0;
        CarPlay_1.CarPlay.bridge.updateManeuvers(maneuvers.map(maneuver => {
            let symbolImage;
            let symbolImageSize;
            let junctionImage;
            let tintSymbolImage;
            if (maneuver.symbolImage) {
                const image = react_native_1.Image.resolveAssetSource(maneuver.symbolImage);
                symbolImage = image;
                symbolImageSize = maneuver.symbolImageSize ?? { width: 50, height: 50 };
                const scale = image.scale || 1.0;
                const width = Math.floor((symbolImageSize.width * windowScale) / scale);
                const height = Math.floor((symbolImageSize.height * windowScale) / scale);
                symbolImageSize = { width, height };
            }
            if (maneuver.junctionImage) {
                junctionImage = react_native_1.Image.resolveAssetSource(maneuver.junctionImage);
            }
            if (maneuver.tintSymbolImage && typeof maneuver.tintSymbolImage === 'string') {
                tintSymbolImage = (0, react_native_1.processColor)(maneuver.tintSymbolImage);
            }
            return { ...maneuver, symbolImage, symbolImageSize, junctionImage, tintSymbolImage };
        }));
    }
    updateTravelEstimates(maneuverIndex, travelEstimates) {
        if (!travelEstimates.distanceUnits) {
            travelEstimates.distanceUnits = 'kilometers';
        }
        CarPlay_1.CarPlay.bridge.updateTravelEstimatesNavigationSession(maneuverIndex, travelEstimates);
    }
    updateTravelEstimatesForTrip(trip, travelEstimates, timeRemainingColor = 0) {
        if (!travelEstimates.distanceUnits) {
            travelEstimates.distanceUnits = 'kilometers';
        }
        CarPlay_1.CarPlay.bridge.updateTravelEstimatesForTrip(this.id, trip.id, travelEstimates, timeRemainingColor);
    }
    /**
     * Update MapTemplate configuration
     */
    updateConfig(config) {
        this.config = config;
        CarPlay_1.CarPlay.bridge.updateMapTemplateConfig(this.id, this.parseConfig(config));
    }
    updateMapButtons(mapButtons) {
        this.config.mapButtons = mapButtons;
        CarPlay_1.CarPlay.bridge.updateMapTemplateMapButtons(this.id, this.parseConfig(mapButtons));
    }
    /**
     * Hides the display of trip previews.
     */
    hideTripPreviews() {
        CarPlay_1.CarPlay.bridge.hideTripPreviews(this.id);
    }
    showTripPreviews(tripPreviews, textConfiguration = {}) {
        CarPlay_1.CarPlay.bridge.showTripPreviews(this.id, tripPreviews.map(trip => trip.id), textConfiguration);
    }
    showTripPreview(tripPreviews, selectedTripId, textConfiguration = {}) {
        CarPlay_1.CarPlay.bridge.showTripPreview(this.id, tripPreviews.map(trip => trip.id), selectedTripId, textConfiguration);
    }
    showRouteChoicesPreviewForTrip(trip, textConfiguration = {}) {
        CarPlay_1.CarPlay.bridge.showRouteChoicesPreviewForTrip(this.id, trip.id, textConfiguration);
    }
    presentNavigationAlert(config, animated = true) {
        CarPlay_1.CarPlay.bridge.presentNavigationAlert(this.id, config, animated);
    }
    /**
     * Dismisses the currently shown navigation alert. This function is async and should be awaited before showing a new alert dialog.
     * @param animated A Boolean value that determines whether to animate the dismissal of the alert dialog.
     * @returns A Promise that indicates if the alert dialog dismissal was successful
     */
    dismissNavigationAlert(animated = true) {
        return CarPlay_1.CarPlay.bridge.dismissNavigationAlert(this.id, animated);
    }
    /**
     * Shows the panning interface over the map.
     *
     * Calling this method while displaying the panning interface has no effect.
     *
     * While showing the panning interface, the system hides all map buttons. The system doesn't provide a button to dismiss the panning interface. Instead, you must provide a map button in the navigation bar that the user taps to dismiss the panning interface.
     * @param animated A Boolean value that determines whether to animate the panning interface.
     */
    showPanningInterface(animated = false) {
        CarPlay_1.CarPlay.bridge.showPanningInterface(this.id, animated);
    }
    /**
     * Dismisses the panning interface.
     *
     * When dismissing the panning interface, the system shows the previously hidden map buttons.
     * @param animated A Boolean value that determines whether to animate the dismissal of the panning interface.
     */
    dismissPanningInterface(animated = false) {
        CarPlay_1.CarPlay.bridge.dismissPanningInterface(this.id, animated);
    }
}
exports.MapTemplate = MapTemplate;
