import React, { Component } from "react";

class Label extends Component {

    constructor(props) {
        super(props);
        this.doKeyPress = this.doKeyPress.bind(this);
    }

    doKeyPress(e) {
        const {
            onClick,
            onKeyPress,
        } = this.props;
        if (onClick && e.key === "Enter") {
            onClick();
            return;
        }
        onKeyPress && onKeyPress(e);
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
                     onKeyPress={this.doKeyPress}>
        {label}
    </span>;
    }
}

Label.defaultProps = {
    preventFocus: false,
};

export default Label;