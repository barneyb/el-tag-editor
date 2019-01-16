export const unparseTag = t => {
    if (t.number == null || t.number === 1) {
        return t.tag;
    }
    return t.tag + ":" + t.number;
};

const unparse = tags =>
    tags.map(unparseTag).join(", ");

export default unparse;
