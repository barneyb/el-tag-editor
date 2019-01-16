import React from "react";
import Pill from "./Pill";

const TagEditor = props => {
    const {
        tags,
        deleteTag,
    } = props;
    return <div style={{
        padding: "3px",
        border: "1px solid #eee",
    }}>
        {tags.map(t =>
            <Pill key={t.tag}
                  doDelete={() => deleteTag(t.tag)}
                  {...t}
            />)}
    </div>;
};

export default TagEditor;
