import * as privateConsts from './privateConsts';


export function getParams() {
    let arg = {};
    const pair = window.location.search.substring(1).split('&');
    for (let i = 0; pair[i]; i++) {
        const kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}

export async function sendPost(objToSend, url) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, { method, headers, body });
    return response.json();
}

export function serverSideErrorProc() {
    const saveKey = "db-access-error-time";

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        window.location.href = `/not-found?p=${window.location.pathname}`;
    } else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload();
    }
    return;
}

export async function sendAccessLog() {
    const saveKey = "lingual-ninja-userId";
    const savedUserId = localStorage.getItem(saveKey);
    let userId;

    if (savedUserId) {
        userId = savedUserId;
    } else {
        var nowDate = new Date();
        userId = nowDate.getTime() + "-" + Math.floor(Math.random() * 1000);
        localStorage.setItem(saveKey, userId);
    }

    const accessInfo = {
        userId: userId,
        href: window.location.href,
        token: privateConsts.LOG_TOKEN
    };

    sendPost(accessInfo, "api/SystemBase/RegisterAccessLog");
}