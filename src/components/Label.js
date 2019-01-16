import React, { Component } from "react";

class Label extends Component {

    constructor(props) {
        super(props);
        this.doKeyDown = this.doKeyDown.bind(this);
    }

    doKeyDown(e) {
        const {
            onClick,
            onKeyDown,
        } = this.props;
        if (onClick && e.key === "Enter") {
            onClick();
            return;
        }
        onKeyDown && onKeyDown(e);
    }

    render() {
        const {
            label,
            preventFocus,
            onClick,
        } = this.props;
        return <span onClick={onClick}
                     tabIndex={preventFocus ? -1 : 0}
                     style={{
                         marginLeft: "3px",
                     }}
                     onKeyDown={this.doKeyDown}>
        {label}
    </span>;
    }
}

Label.defaultProps = {
    preventFocus: false,
};

export default Label;