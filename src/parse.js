const parse = tags =>
    tags.trim().split(",")
        .map(t => t.trim())
        .filter(t => t.length > 0)
        .map(t => {
            if (t.indexOf(":") < 0) {
                return {
                    tag: t,
                };
            }
            const parts = t.split(":");
            // blindly assume two parts :)
            return {
                tag: parts[0],
                number: parseFloat(parts[1]),
            };
        });

export default parse;