import React from "react";
import Pill from "./Pill";
import unparse from "../util/unparse";

const TagEditor = props => {
        const {
            tags,
            deleteTag,
        } = props;
        return <div>
            <div style={{
                padding: "3px",
                border: "1px solid #eee",
            }}>
                {tags.map(t =>
                    <Pill key={t.tag}
                          doDelete={() => deleteTag(t.tag)}
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
};

export default TagEditor;
