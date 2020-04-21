import { APP_VERSION } from './../../version';

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

export function sendPostWithoutAwait(objToSend, url) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    fetch(url, { method, headers, body });
}

export async function sendPostNoJsonResult(objToSend, url) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, { method, headers, body });
    return response;
}

export async function sendPostNoJsonResultWithoutAwait(objToSend, url) {
    const method = "POST";
    const body = JSON.stringify(objToSend);
    const headers = {
        'Content-Type': 'application/json'
    };
    fetch(url, { method, headers, body });
}

export function sendClientOpeLog(operationName: string, parameters: string = "") {
    const saveKey = "userId";
    let userId = JSON.parse(window.localStorage.getItem(saveKey));

    if (!userId) {
        const nowDate = new Date();
        const rand = Math.floor(Math.random() * 10000);

        userId = `${nowDate.getFullYear()}/${nowDate.getMonth() + 1}/${nowDate.getDate()}-${nowDate.getHours()}:${nowDate.getMinutes()}:${nowDate.getSeconds()}-${rand}`;
        window.localStorage.setItem(saveKey, JSON.stringify(userId));
    }

    const log = {
        url: window.location.href,
        operationName,
        userId,
        parameters,
    };
    sendPostNoJsonResultWithoutAwait(log, "api/SystemBase/RegisterLog");
}

export async function checkAppVersion() {
    const url = 'version.txt';
    fetch(url).then(res => {
        res.json().then(v => {
            const userAgent = navigator.userAgent;
            sendClientOpeLog(`Came from ${document.referrer}`, `ClientVersion:${APP_VERSION} ServerVersion:${v} UserAgent:${userAgent}`);
            console.log("ClientVersion: " + APP_VERSION);
            console.log("ServerVersion: " + v);

            if (Number(v) !== APP_VERSION && !userAgent.includes("Googlebot")) {
                const saveKey = "AppVersionCheckErrorCount";
                const errCount: number = Number(sessionStorage.getItem(saveKey)) || 0;

                if (errCount <= 5) {
                    window.sessionStorage.setItem(saveKey, (errCount + 1).toString());
                    window.location.reload(true);
                }
            }
        });
    });
}

export function reloadAndRedirect(saveKey: string) {
    //初回はリロードし、時刻記録
    //その後、10秒間リロード連打
    //その後、404ページにリダイレクト

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        if (nowTime - intSavedTime < 10000) {
            window.location.reload(true);
        } else {
            window.location.href = `/not-found?p=${window.location.pathname}`;
        }
    } else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload(true);
    }
    return;
}

export function reloadAndRedirect_OneTimeReload(saveKey: string) {
    //★広告表示等のため、リロード連打がまずい場合はこちらを使う
    //初回はリロードし、時刻記録
    //その後、1回だけリロード
    //その後、その後、404ページにリダイレクト
    //存在してはいけないページがIndexされないため、２回目は即時リダイレクトを行う

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        window.location.href = `/not-found?p=${window.location.pathname}`;
    } else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload(true);
    }
    return;
}

//localStorageかDBからデータを取得し、reduxのstoreを更新
export function loadLocalStorageOrDB(url: string, type: string, stateName: string, fileName: string, dispatch) {
    const saveKey = fileName + stateName;

    const loadData = (url: string, type: string, stateName: string) => {
        fetch(url).then(res => {
            res.json().then(objResult => {

                const action = { type };
                action[stateName] = objResult;
                dispatch(action);

                window.localStorage.setItem(saveKey, JSON.stringify(objResult));
            });
        });
    }

    try {
        const savedObject = JSON.parse(window.localStorage.getItem(saveKey));

        if (savedObject) {
            const action = { type };
            action[stateName] = savedObject;
            dispatch(action);
        }
        loadData(url, type, stateName);
    } catch (e) {
        reloadAndRedirect_OneTimeReload("db-access-error-time");
    }
}

//配列シャッフル
export function shuffle(array: any[]) {
    let n = array.length, t, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        t = array[n];
        array[n] = array[i];
        array[i] = t;
    }

    return array;
}