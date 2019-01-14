import React from "react";
import Tag from "./Tag";
import Number from "./Number";

const Pill = props => {
    const {
        tag,
        number: n,
    } = props;
    return <code style={{
        display: "inline-block",
        padding: "1px 3px",
        margin: "1px 5px 1px 0",
        border: "1px solid #09f",
        backgroundColor: "#f0f7ff",
    }}>
        <Tag tag={tag} />
        {n != null && n !== 1 && <Number n={n} />}
    </code>;
};

export default Pill;
