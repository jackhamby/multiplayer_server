"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./game_wrapper.css");
const game_1 = __importDefault(require("./game"));
class GameWrapper extends react_1.default.Component {
    render() {
        return (react_1.default.createElement("div", { className: "col-8 container" },
            react_1.default.createElement(game_1.default, null)));
    }
}
exports.default = GameWrapper;
//# sourceMappingURL=game_wrapper.js.map