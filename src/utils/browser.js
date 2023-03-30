function isJsonString(data) {
    try {
        JSON.parse(data)
    } catch (e) {
        return false
    }
    return true
}

export function setStorage(key, value) {
    let data = null
    if (value instanceof Object) {
        data = JSON.stringify(value)
    } else {
        data = value
    }
    localStorage.setItem(key, data)
}

export function getStorage(key) {
    const result = localStorage.getItem(key)
    if (result && isJsonString(result)) {
        return JSON.parse(result)
    } else {
        return result
    }
}