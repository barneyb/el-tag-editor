export const unparseTag = t => {
    return t.explicit
        ? t.tag + ":" + t.number
        : t.tag;
};

const unparse = tags =>
    tags.map(unparseTag).join(", ");

export default unparse;
