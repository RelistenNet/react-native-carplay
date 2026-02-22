"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceControlTemplate = void 0;
const CarPlay_1 = require("../CarPlay");
const Template_1 = require("./Template");
/**
 * Displays a voice control indicator on the CarPlay screen.
 *
 * CarPlay navigation apps must show the voice control template during audio input.
 */
class VoiceControlTemplate extends Template_1.Template {
    get type() {
        return 'voicecontrol';
    }
    activateVoiceControlState(identifier) {
        CarPlay_1.CarPlay.bridge.activateVoiceControlState(this.id, identifier);
    }
}
exports.VoiceControlTemplate = VoiceControlTemplate;
