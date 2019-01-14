const unparse = tags =>
    tags.map(t => {
        if (t.number == null || t.number === 1) {
            return t.tag;
        }
        return t.tag + ":" + t.number;
    }).join(", ");

export default unparse;
