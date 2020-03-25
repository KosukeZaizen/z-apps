"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const receiveStoriesType = 'RECEIVE_STORIES';
const initialState = { allStories: [] };
exports.actionCreators = {
    loadAllStories: () => (dispatch) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const url = `api/Stories/GetAllStories`;
            const response = yield fetch(url);
            const allStories = yield response.json();
            dispatch({ type: receiveStoriesType, allStories });
        }
        catch (e) {
            window.location.reload();
        }
    }),
};
exports.reducer = (state, action) => {
    state = state || initialState;
    if (action.type === receiveStoriesType) {
        return Object.assign(Object.assign({}, state), { allStories: action.allStories });
    }
    return state;
};
