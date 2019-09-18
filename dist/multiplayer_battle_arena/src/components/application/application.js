"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const game_wrapper_1 = __importDefault(require("../game/game_wrapper"));
const player_list_wrapper_1 = __importDefault(require("../player_list/player_list_wrapper"));
const player_detail_wrapper_1 = __importDefault(require("../player_detail/player_detail_wrapper"));
const header_wrapper_1 = __importDefault(require("../header/header_wrapper"));
const connection_manager_1 = __importDefault(require("../../util/connection_manager"));
const error_1 = __importDefault(require("../util/error"));
;
const connectionManager = new connection_manager_1.default();
class Application extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            players: [],
            error: undefined
        };
    }
    componentDidMount() {
        try {
            connectionManager.connect();
        }
        catch (err) {
            this.setState({ error: err });
        }
    }
    render() {
        if (this.state.error) {
            return (react_1.default.createElement("div", { className: "container-fluid container" },
                react_1.default.createElement(error_1.default, null)));
        }
        else {
            return (react_1.default.createElement("div", { className: "container-fluid container" },
                react_1.default.createElement("div", { className: "row top-container" },
                    react_1.default.createElement(header_wrapper_1.default, null)),
                react_1.default.createElement("div", { className: "row center-container" },
                    react_1.default.createElement(game_wrapper_1.default, null),
                    react_1.default.createElement(player_list_wrapper_1.default, null)),
                react_1.default.createElement("div", { className: "row bottom-container" },
                    react_1.default.createElement(player_detail_wrapper_1.default, null))));
        }
    }
}
exports.default = Application;
//# sourceMappingURL=application.js.map