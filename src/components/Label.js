import React from "react";

class Label extends React.PureComponent {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    focus() {
        this.ref.current.focus();
    }

    render() {
        const {
            label,
            preventFocus,
            onKeyDown,
            onClick,
            className,
        } = this.props;
        return <span className={"Label " + className}
                     onClick={onClick}
                     tabIndex={preventFocus ? -1 : 0}
                     onKeyDown={onKeyDown}
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