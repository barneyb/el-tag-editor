import React from "react";
import Pill from "./Pill";
import NewTag from "./NewTag";

const TagEditor = ({
                       tags,
                       addTag,
                       renameTag,
                       setTagNumber,
                       deleteTag,
                   }) =>
    <div style={{
        padding: "3px",
        border: "1px solid #eee",
    }}>
        {tags.map(t =>
            <Pill key={t.tag}
                  onRename={newTag => renameTag(t.tag, newTag)}
                  onSetNumber={number => setTagNumber(t.tag, number)}
                  onDelete={() => deleteTag(t.tag)}
                  {...t}
            />)}
        <NewTag onCommit={addTag} />
    </div>;

export default TagEditor;
