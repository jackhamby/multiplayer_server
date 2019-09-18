"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const player_detail_1 = __importDefault(require("./player_detail"));
class PlayerDetailWrapper extends react_1.default.Component {
    render() {
        return (react_1.default.createElement("div", { className: "col-12 container" },
            react_1.default.createElement(player_detail_1.default, null)));
    }
}
exports.default = PlayerDetailWrapper;
//# sourceMappingURL=player_detail_wrapper.js.map