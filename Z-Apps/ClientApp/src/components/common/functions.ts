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

export function reloadAndRedirect(saveKey: string) {
    //初回はリロードし、時刻記録
    //その後、10秒間リロード連打
    //その後、10秒後に404ページにリダイレクト

    const savedErrTime = window.sessionStorage.getItem(saveKey);
    const intSavedTime = parseInt(savedErrTime);

    const now = new Date();
    const nowTime = now.getTime();

    if (intSavedTime && (nowTime - intSavedTime < 15000)) {
        if (nowTime - intSavedTime < 10000) {
            console.log("reload");
            window.location.reload(true);
        } else {
            console.log("redirect");
            setTimeout(() => {
                window.location.href = `/not-found?p=${window.location.pathname}`;
            }, 10000);
        }
    } else {
        console.log("reload");
        window.sessionStorage.setItem(saveKey, nowTime.toString());
        window.location.reload(true);
    }
    return;
}
