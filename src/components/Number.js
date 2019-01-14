import React from "react";

const Tag = props => {
    return <span style={{
        marginLeft: "3px",
        paddingLeft: "3px",
        borderLeft: "1px solid #09f",
    }}>{props.n}</span>;
};

export default Tag;
