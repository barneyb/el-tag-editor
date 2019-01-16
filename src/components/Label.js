import React from "react";

const Label = ({
                            label,
                            preventFocus = false,
                            onClick,
                        }) =>
    <button onClick={onClick}
            tabIndex={preventFocus ? -1 : 0}
            style={{
                marginLeft: "3px",
                borderWidth: 0,
                backgroundColor: "inherit",
            }}>
        {label}
    </button>;

export default Label;