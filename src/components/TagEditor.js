import React from "react";
import Pill from "./Pill";
import AddTag from "./AddTag";

const TagEditor = ({
                       tags,
                       deleteTag,
                       addTag,
                   }) =>
    <div style={{
        padding: "3px",
        border: "1px solid #eee",
    }}>
        {tags.map(t =>
            <Pill key={t.tag}
                  doDelete={() => deleteTag(t.tag)}
                  {...t}
            />)}
        <AddTag add={addTag} />
    </div>;

export default TagEditor;
