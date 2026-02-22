"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCallbackActionId = void 0;
function getCallbackActionId() {
    return `${performance.now()}-${Math.round(Math.random() * Number.MAX_SAFE_INTEGER)}`;
}
exports.getCallbackActionId = getCallbackActionId;
