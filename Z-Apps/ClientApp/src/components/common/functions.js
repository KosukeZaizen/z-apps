export function getParams(){
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