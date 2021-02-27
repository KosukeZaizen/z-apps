const results: { [key: string]: any } = {};

export async function cFetch(url: string) {
    if (results[url]) {
        return results[url].clone();
    }

    const result = await fetch(url);
    results[url] = result.clone();

    return result;
}
