"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PauseReason = void 0;
var PauseReason;
(function (PauseReason) {
    PauseReason[PauseReason["Arrived"] = 1] = "Arrived";
    PauseReason[PauseReason["Loading"] = 2] = "Loading";
    PauseReason[PauseReason["Locating"] = 3] = "Locating";
    PauseReason[PauseReason["Rerouting"] = 4] = "Rerouting";
    PauseReason[PauseReason["ProceedToRoute"] = 5] = "ProceedToRoute";
})(PauseReason = exports.PauseReason || (exports.PauseReason = {}));
