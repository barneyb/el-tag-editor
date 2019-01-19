export const sanitizeTag = val =>
    val.replace(/,/g, '');

export const sanitizeNumber = val => {
    val = val.trim();
    let result = "";
    let foundPeriod = false;
    for (let i = 0; i < val.length; i++) {
        const c = val.charAt(i);
        if (c === ".") {
            if (foundPeriod) {
                continue;
            }
            foundPeriod = true;
        } else if (c < "0" || c > "9") {
            continue;
        }
        result += c;
    }
    return result;
};
