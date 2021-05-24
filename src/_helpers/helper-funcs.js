
export const storePut = function (key, obj) {
    return localStorage.setItem(key, JSON.stringify(obj))
};

export const storeGet = function (key) {
    return JSON.parse(localStorage.getItem(key))
};