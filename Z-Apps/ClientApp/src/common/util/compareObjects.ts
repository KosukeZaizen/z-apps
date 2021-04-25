// ２つのオブジェクトの内容が同一であることを確認
export function compareObjects<T>(a?: T, b?: T) {
    if (!a || !b) {
        return false;
    }

    // ２つのオブジェクトのキーをマージ
    const keys1 = Object.keys(a) as (keyof T)[];
    const keys2 = Object.keys(b) as (keyof T)[];
    const allKeys = [...keys1, ...keys2];
    // 重複除去
    allKeys.filter((k, i) => allKeys.indexOf(k) === i);

    // 全てのキーに対して同じ値が入っていることを確認
    return keys1.every(key => a[key] === b[key]);
}
