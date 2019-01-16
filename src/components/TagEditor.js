import React from "react";
import Pill from "./Pill";
import NewTag from "./NewTag";

const TagEditor = ({
                       tags,
                       renameTag,
                       deleteTag,
                       addTag,
                   }) =>
    <div style={{
        padding: "3px",
        border: "1px solid #eee",
    }}>
        {tags.map(t =>
            <Pill key={t.tag}
                  doRename={newTag => renameTag(t.tag, newTag)}
                  doDelete={() => deleteTag(t.tag)}
                  {...t}
            />)}
        <NewTag onCommit={addTag} />
    </div>;

export default TagEditor;
