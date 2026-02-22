"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NowPlayingTemplate = void 0;
const Template_1 = require("./Template");
class NowPlayingTemplate extends Template_1.Template {
    get type() {
        return 'nowplaying';
    }
    get eventMap() {
        return {
            albumArtistButtonPressed: 'onAlbumArtistButtonPressed',
            upNextButtonPressed: 'onUpNextButtonPressed',
            buttonPressed: 'onButtonPressed',
        };
    }
}
exports.NowPlayingTemplate = NowPlayingTemplate;
