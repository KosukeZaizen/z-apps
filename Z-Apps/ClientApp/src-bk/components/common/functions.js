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
function getParams() {
    let arg = {};
    const pair = window.location.search.substring(1).split('&');
    for (let i = 0; pair[i]; i++) {
        const kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}
exports.getParams = getParams;
function sendPost(objToSend, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const method = "POST";
        const body = JSON.stringify(objToSend);
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const response = yield fetch(url, { method, headers, body });
        return response.json();
    });
}
exports.sendPost = sendPost;
function sendPostWithoutAwait(objToSend, url) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    fetch(url, { method, headers, body });
}
exports.sendPostWithoutAwait = sendPostWithoutAwait;
function sendPostNoJsonResult(objToSend, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const method = "POST";
        const body = JSON.stringify(objToSend);
        const headers = {
            'Content-Type': 'application/json'
        };
        const response = yield fetch(url, { method, headers, body });
        return response;
    });
}
exports.sendPostNoJsonResult = sendPostNoJsonResult;
function serverSideErrorProc() {
    const saveKey = "db-access-error-time";
    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);
    const now = new Date();
    const nowTime = now.getTime();
    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        window.location.href = `/not-found?p=${window.location.pathname}`;
    }
    else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload();
    }
    return;
}
exports.serverSideErrorProc = serverSideErrorProc;
