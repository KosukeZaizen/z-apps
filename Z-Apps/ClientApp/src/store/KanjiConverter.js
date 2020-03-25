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
const requestKanjiConverterType = 'REQUEST_KANJI_CONVERTER';
const receiveKanjiConverterType = 'RECEIVE_KANJI_CONVERTER';
const initialState = { convertedWords: [], isLoading: false };
exports.actionCreators = {
    requestKanjiConvert: kanjis => (dispatch, getState) => __awaiter(void 0, void 0, void 0, function* () {
        if (kanjis === getState().kanjiConverter.kanjis) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
        dispatch({ type: requestKanjiConverterType, kanjis });
        const url = `api/ConvertKanji/Convert?kanjis=${kanjis}`;
        const response = yield fetch(url);
        const convertedWords = yield response.json();
        dispatch({ type: receiveKanjiConverterType, kanjis, convertedWords });
    })
};
exports.reducer = (state, action) => {
    state = state || initialState;
    if (action.type === requestKanjiConverterType) {
        return Object.assign(Object.assign({}, state), { kanjis: action.kanjis, isLoading: true });
    }
    if (action.type === receiveKanjiConverterType) {
        return Object.assign(Object.assign({}, state), { kanjis: action.kanjis, convertedWords: action.convertedWords, isLoading: false });
    }
    return state;
};
