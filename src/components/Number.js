import React from "react";
import EditInPlace from "./EditInPlace";

const Number = ({
                    n,
                    onSet,
                }) =>
    <EditInPlace value={n}
                 onCommit={onSet}
    />;


export default Number;
