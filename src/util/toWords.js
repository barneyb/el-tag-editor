const toWords = string =>
    string.trim()
        .split(" ")
        .map(it => it.trim())
        .filter(it => it.length > 0);

export default toWords;