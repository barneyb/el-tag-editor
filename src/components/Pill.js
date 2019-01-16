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
    <code className="Pill">
        <Tag tag={tag}
             onRename={onRename}
             doDelete={onDelete}
        />
        {explicit && <Number n={number}
                             onSet={onSetNumber}
        />}
        <Label className="delete"
               label="x"
               onClick={onDelete}
               preventFocus
        />
    </code>;

export default Pill;
