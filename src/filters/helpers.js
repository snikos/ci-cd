export function capitalize(value) {
    if (!value) return '';
    if (typeof value !== 'string') {
        value = value.toString();
    }
    return value.charAt(0).toUpperCase() + value.slice(1)
}

export function isObject(obj) {
    return obj === Object(obj);
    //next variable is not working
    //return (typeof obj === "object" && !Array.isArray(obj) && obj !== null)
}