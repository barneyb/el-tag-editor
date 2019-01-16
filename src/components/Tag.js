import React from "react";
import EditInPlace from "./EditInPlace";

const Tag = ({
                 tag,
                 onRename,
             }) =>
    <EditInPlace value={tag}
                 onCommit={onRename}
    />;

export default Tag;
