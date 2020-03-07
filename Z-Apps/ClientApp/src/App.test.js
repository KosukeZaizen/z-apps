"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var react_dom_1 = __importDefault(require("react-dom"));
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var App_1 = __importDefault(require("./App"));
it('renders without crashing', function () {
    var storeFake = function (state) { return ({
        default: function () { },
        subscribe: function () { },
        dispatch: function () { },
        getState: function () { return (__assign({}, state)); }
    }); };
    var store = storeFake({});
    var div = document.createElement('div');
    react_dom_1.default.render(<react_redux_1.Provider store={store}>
      <react_router_dom_1.MemoryRouter>
        <App_1.default />
      </react_router_dom_1.MemoryRouter>
    </react_redux_1.Provider>, div);
});
