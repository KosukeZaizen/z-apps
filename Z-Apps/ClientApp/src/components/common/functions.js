export function getParams(){
    let arg = {};
    let pair = window.location.search.substring(1).split('&');
    for (let i = 0; pair[i]; i++) {
        let kv = pair[i].split('=');
        arg[kv[0]] = kv[1];
    }
    return arg;
}