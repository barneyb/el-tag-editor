import React from "react";
import Tag from "./Tag";

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

const e = React.createElement;

class TagEditor extends React.PureComponent {

    render() {
        const objs = parse(this.props.tags);
        return e("div", null, [
            e("textarea", {
                key: "textarea",
                rel: "from-react",
                value: this.props.tags,
                onChange: e => this.props.onChange(e.target.value),
            }),
            e("div", {
                key: "editor",
                style: {
                    padding: "3px",
                    border: "1px solid #eee",
                },
            }, objs.map(t => e(Tag, {
                key: t.tag,
                ...t,
            }))),
            e("pre", {
                key: "pre",
                style: {
                    padding: "5px",
                    border: "1px solid #ff0",
                    backgroundColor: "#ffe",
                }
            }, [
                JSON.stringify(objs, null, 3)
            ])
        ]);
    }
}

export default TagEditor;
