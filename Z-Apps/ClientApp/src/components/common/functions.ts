import * as consts from './consts';

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

export async function checkAppVersion() {
    const url = 'api/Version/GetVersion';
    fetch(url).then(res => {
        res.json().then(v => {
            if (Number(v) !== consts.APP_VERSION) {
                window.location.reload(true);
            }
        })
    });
}

export function reloadAndRedirect(saveKey: string) {
    //初回はリロードし、時刻記録
    //その後、10秒間リロード連打
    //その後、3秒後に404ページにリダイレクト

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        if (nowTime - intSavedTime < 10000) {
            window.location.reload(true);
        } else {
            setTimeout(() => {
                window.location.href = `/not-found?p=${window.location.pathname}`;
            }, 3000);
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
    //その後、10秒後に404ページにリダイレクト

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        setTimeout(() => {
            window.location.href = `/not-found?p=${window.location.pathname}`;
        }, 10000);
    } else {
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload(true);
    }
    return;
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