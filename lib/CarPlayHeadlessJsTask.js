"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
// this headless task is required on Android (Auto) to make sure timers are working fine when screen is off
const { RNCarPlay } = react_native_1.NativeModules;
const emitter = new react_native_1.NativeEventEmitter(RNCarPlay);
const headlessTask = () => _ => new Promise((resolve, reject) => {
    let subscription = null;
    try {
        subscription = emitter.addListener('didDisconnect', () => {
            try {
                subscription?.remove();
                resolve();
            }
            catch (error) {
                console.error('Error in CarPlayHeadlessJsTask didDisconnect listener:', error);
                reject(error);
            }
        });
    }
    catch (error) {
        console.error('Error in headless task:', error);
        subscription?.remove();
        reject(error);
    }
});
function registerHeadlessTask() {
    if (react_native_1.Platform.OS !== 'android') {
        return;
    }
    react_native_1.AppRegistry.registerHeadlessTask('CarPlayHeadlessJsTask', headlessTask);
}
exports.default = registerHeadlessTask;
