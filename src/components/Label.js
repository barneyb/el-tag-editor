import React, { Component } from "react";

class Label extends Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
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

    focus() {
        this.ref.current.focus();
    }

    render() {
        const {
            label,
            preventFocus,
            onClick,
            className,
        } = this.props;
        return <span className={"Label " + className}
                     onClick={onClick}
                     tabIndex={preventFocus ? -1 : 0}
                     onKeyDown={this.doKeyDown}
                     ref={this.ref}
        >
        {label}
    </span>;
    }
}

Label.defaultProps = {
    preventFocus: false,
};

export default Label;