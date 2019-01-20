export const unparseTag = t =>
    t.explicit
        ? t.tag + ":" + t.number
        : t.tag;

const unparse = tags =>
    tags.map(unparseTag)
        .map(t => t + ", ")
        .join("");

export default unparse;
