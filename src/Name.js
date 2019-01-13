import React from "react";

const Name = props =>
    React.createElement('em', null, props.name || "World");

export default Name;
