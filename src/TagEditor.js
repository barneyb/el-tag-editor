import React from "react";
import Tag from "./Tag";
import unparse from "./unparse";

class TagEditor extends React.PureComponent {

    render() {
        const {
            tags,
        } = this.props;
        return <div>
            <div style={{
                padding: "3px",
                border: "1px solid #eee",
            }}>
                {tags.map(t =>
                    <Tag key={t.tag}
                         {...t}
                    />)}
            </div>
            <hr />
            <code>{unparse(tags)}</code>
            <pre style={{
                padding: "5px",
                border: "1px solid #ff0",
                backgroundColor: "#ffe",
            }}>
                {JSON.stringify(tags, null, 3)}
            </pre>
        </div>;
    }
}

export default TagEditor;
