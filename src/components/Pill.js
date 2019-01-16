import React from "react";
import Tag from "./Tag";
import Number from "./Number";
import Label from "./Label";

const Pill = ({
                  tag,
                  number,
                  explicit,
                  onRename,
                  onSetNumber,
                  onDelete,
              }) =>
    <code style={{
        display: "inline-block",
        padding: "1px 3px",
        margin: "1px 5px 1px 0",
        border: "1px solid #09f",
        backgroundColor: "#f0f7ff",
    }}>
        <Tag tag={tag}
             onRename={onRename}
             doDelete={onDelete}
        />
        {explicit && <Number n={number}
                             onSet={onSetNumber}
        />}
        <Label label="x"
               onClick={onDelete}
               preventFocus
        />
    </code>;

export default Pill;
