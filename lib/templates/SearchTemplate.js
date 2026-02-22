"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTemplate = void 0;
const react_native_1 = require("react-native");
const CarPlay_1 = require("../CarPlay");
const Template_1 = require("./Template");
class SearchTemplate extends Template_1.Template {
    config;
    get type() {
        return 'search';
    }
    get eventMap() {
        return {
            searchButtonPressed: 'onSearchButtonPressed',
            backButtonPressed: 'onBackButtonPressed',
        };
    }
    constructor(config) {
        // parse out any images in the results
        super(config);
        this.config = config;
        let subscription = CarPlay_1.CarPlay.emitter.addListener('updatedSearchText', async (e) => {
            if (config.onSearch && e.templateId === this.id) {
                const result = await config.onSearch(e.searchText).catch(() => null);
                if (result == null) {
                    return;
                }
                const parsedResults = result.map(item => ({
                    ...item,
                    image: item.image ? react_native_1.Image.resolveAssetSource(item.image) : undefined,
                }));
                if (react_native_1.Platform.OS === 'ios') {
                    CarPlay_1.CarPlay.bridge.reactToUpdatedSearchText(e.templateId, parsedResults);
                }
                else if (react_native_1.Platform.OS === 'android') {
                    this.config = { ...this.config, items: parsedResults };
                    CarPlay_1.CarPlay.bridge.updateTemplate(e.templateId, JSON.parse(JSON.stringify({ ...this.config, type: this.type })));
                }
            }
        });
        this.listenerSubscriptions.push(subscription);
        subscription = CarPlay_1.CarPlay.emitter.addListener('selectedResult', (e) => {
            if (config.onItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onItemSelect(e)).then(() => react_native_1.Platform.OS === 'ios' && CarPlay_1.CarPlay.bridge.reactToSelectedResult(true));
            }
        });
        this.listenerSubscriptions.push(subscription);
        subscription = CarPlay_1.CarPlay.emitter.addListener('didSelectListItem', (e) => {
            if (config.onItemSelect && e.templateId === this.id) {
                void Promise.resolve(config.onItemSelect(e)).then(() => {
                    if (react_native_1.Platform.OS === 'ios') {
                        CarPlay_1.CarPlay.bridge.reactToSelectedResult(true);
                    }
                });
            }
        });
        this.listenerSubscriptions.push(subscription);
    }
}
exports.SearchTemplate = SearchTemplate;
