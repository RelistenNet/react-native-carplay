"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shape = exports.AndroidAutoManeuverType = exports.CarIconSpanAlignment = void 0;
var CarIconSpanAlignment;
(function (CarIconSpanAlignment) {
    CarIconSpanAlignment[CarIconSpanAlignment["ALIGN_BOTTOM"] = 0] = "ALIGN_BOTTOM";
    CarIconSpanAlignment[CarIconSpanAlignment["ALIGN_BASELINE"] = 1] = "ALIGN_BASELINE";
    CarIconSpanAlignment[CarIconSpanAlignment["ALIGN_CENTER"] = 2] = "ALIGN_CENTER";
})(CarIconSpanAlignment = exports.CarIconSpanAlignment || (exports.CarIconSpanAlignment = {}));
var AndroidAutoManeuverType;
(function (AndroidAutoManeuverType) {
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_UNKNOWN"] = 0] = "TYPE_UNKNOWN";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_DEPART"] = 1] = "TYPE_DEPART";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_NAME_CHANGE"] = 2] = "TYPE_NAME_CHANGE";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_KEEP_LEFT"] = 3] = "TYPE_KEEP_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_KEEP_RIGHT"] = 4] = "TYPE_KEEP_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_SLIGHT_LEFT"] = 5] = "TYPE_TURN_SLIGHT_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_SLIGHT_RIGHT"] = 6] = "TYPE_TURN_SLIGHT_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_NORMAL_LEFT"] = 7] = "TYPE_TURN_NORMAL_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_NORMAL_RIGHT"] = 8] = "TYPE_TURN_NORMAL_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_SHARP_LEFT"] = 9] = "TYPE_TURN_SHARP_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_TURN_SHARP_RIGHT"] = 10] = "TYPE_TURN_SHARP_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_U_TURN_LEFT"] = 11] = "TYPE_U_TURN_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_U_TURN_RIGHT"] = 12] = "TYPE_U_TURN_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_SLIGHT_LEFT"] = 13] = "TYPE_ON_RAMP_SLIGHT_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_SLIGHT_RIGHT"] = 14] = "TYPE_ON_RAMP_SLIGHT_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_NORMAL_LEFT"] = 15] = "TYPE_ON_RAMP_NORMAL_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_NORMAL_RIGHT"] = 16] = "TYPE_ON_RAMP_NORMAL_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_SHARP_LEFT"] = 17] = "TYPE_ON_RAMP_SHARP_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_SHARP_RIGHT"] = 18] = "TYPE_ON_RAMP_SHARP_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_U_TURN_LEFT"] = 19] = "TYPE_ON_RAMP_U_TURN_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ON_RAMP_U_TURN_RIGHT"] = 20] = "TYPE_ON_RAMP_U_TURN_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_OFF_RAMP_SLIGHT_LEFT"] = 21] = "TYPE_OFF_RAMP_SLIGHT_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_OFF_RAMP_SLIGHT_RIGHT"] = 22] = "TYPE_OFF_RAMP_SLIGHT_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_OFF_RAMP_NORMAL_LEFT"] = 23] = "TYPE_OFF_RAMP_NORMAL_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_OFF_RAMP_NORMAL_RIGHT"] = 24] = "TYPE_OFF_RAMP_NORMAL_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FORK_LEFT"] = 25] = "TYPE_FORK_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FORK_RIGHT"] = 26] = "TYPE_FORK_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_MERGE_LEFT"] = 27] = "TYPE_MERGE_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_MERGE_RIGHT"] = 28] = "TYPE_MERGE_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_MERGE_SIDE_UNSPECIFIED"] = 29] = "TYPE_MERGE_SIDE_UNSPECIFIED";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_AND_EXIT_CW"] = 32] = "TYPE_ROUNDABOUT_ENTER_AND_EXIT_CW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_AND_EXIT_CW_WITH_ANGLE"] = 33] = "TYPE_ROUNDABOUT_ENTER_AND_EXIT_CW_WITH_ANGLE";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_AND_EXIT_CCW"] = 34] = "TYPE_ROUNDABOUT_ENTER_AND_EXIT_CCW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_AND_EXIT_CCW_WITH_ANGLE"] = 35] = "TYPE_ROUNDABOUT_ENTER_AND_EXIT_CCW_WITH_ANGLE";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_STRAIGHT"] = 36] = "TYPE_STRAIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_BOAT"] = 37] = "TYPE_FERRY_BOAT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_TRAIN"] = 38] = "TYPE_FERRY_TRAIN";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_DESTINATION"] = 39] = "TYPE_DESTINATION";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_DESTINATION_STRAIGHT"] = 40] = "TYPE_DESTINATION_STRAIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_DESTINATION_LEFT"] = 41] = "TYPE_DESTINATION_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_DESTINATION_RIGHT"] = 42] = "TYPE_DESTINATION_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_CW"] = 43] = "TYPE_ROUNDABOUT_ENTER_CW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_EXIT_CW"] = 44] = "TYPE_ROUNDABOUT_EXIT_CW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_ENTER_CCW"] = 45] = "TYPE_ROUNDABOUT_ENTER_CCW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_ROUNDABOUT_EXIT_CCW"] = 46] = "TYPE_ROUNDABOUT_EXIT_CCW";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_BOAT_LEFT"] = 47] = "TYPE_FERRY_BOAT_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_BOAT_RIGHT"] = 48] = "TYPE_FERRY_BOAT_RIGHT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_TRAIN_LEFT"] = 49] = "TYPE_FERRY_TRAIN_LEFT";
    AndroidAutoManeuverType[AndroidAutoManeuverType["TYPE_FERRY_TRAIN_RIGHT"] = 50] = "TYPE_FERRY_TRAIN_RIGHT";
})(AndroidAutoManeuverType = exports.AndroidAutoManeuverType || (exports.AndroidAutoManeuverType = {}));
var Shape;
(function (Shape) {
    Shape[Shape["UNKNOWN"] = 1] = "UNKNOWN";
    Shape[Shape["STRAIGHT"] = 2] = "STRAIGHT";
    /** Slight left turn, from 10 (included) to 45 (excluded) degrees. */
    Shape[Shape["SLIGHT_LEFT"] = 3] = "SLIGHT_LEFT";
    /** Slight right turn, from 10 (included) to 45 (excluded) degrees. */
    Shape[Shape["SLIGHT_RIGHT"] = 4] = "SLIGHT_RIGHT";
    /** Regular left turn, from 45 (included) to 135 (excluded) degrees. */
    Shape[Shape["NORMAL_LEFT"] = 5] = "NORMAL_LEFT";
    /** Regular right turn, from 45 (included) to 135 (excluded) degrees. */
    Shape[Shape["NORMAL_RIGHT"] = 6] = "NORMAL_RIGHT";
    /** Sharp left turn, from 135 (included) to 175 (excluded) degrees. */
    Shape[Shape["SHARP_LEFT"] = 7] = "SHARP_LEFT";
    /** Sharp right turn, from 135 (included) to 175 (excluded) degrees. */
    Shape[Shape["SHARP_RIGHT"] = 8] = "SHARP_RIGHT";
    /**
     * A left turn onto the opposite side of the same street, from 175 (included) to 180 (included) degrees
     */
    Shape[Shape["U_TURN_LEFT"] = 9] = "U_TURN_LEFT";
    /**
     * A right turn onto the opposite side of the same street, from 175 (included) to 180 (included) degrees
     */
    Shape[Shape["U_TURN_RIGHT"] = 10] = "U_TURN_RIGHT";
})(Shape = exports.Shape || (exports.Shape = {}));
