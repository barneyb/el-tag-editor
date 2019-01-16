import React from "react";

const Label = ({
                   label,
                   preventFocus = false,
                   onClick,
                   onKeyPress,
               }) =>
    <button onClick={onClick}
            tabIndex={preventFocus ? -1 : 0}
            style={{
                marginLeft: "3px",
                borderWidth: 0,
                backgroundColor: "inherit",
            }}
            onKeyPress={onKeyPress}>
        {label}
    </button>;

export default Label;