import React from 'react';

class Input extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onBlur = this.onBlur.bind(this);
    }

    onKeyDown(e) {
        const {
            onCancel,
            onCommit,
        } = this.props;
        switch (e.key) {
            case "Escape":
                onCancel && onCancel();
                break;
            case "Enter":
                onCommit && onCommit();
                break;
        }
    }

    onChange(e) {
        const v = e.target.value;
        const sanitize = this.props.sanitize;
        this.props.onChange(sanitize ? sanitize(v) : v);
    }

    onBlur() {
        const {
            cancelOnBlur,
            onCancel,
        } = this.props;
        cancelOnBlur && onCancel && onCancel();
    }

    render() {
        const {
            value,
            placeholder,
            className,
        } = this.props;
        return <span className={"Input " + className}>
            <input onKeyDown={this.onKeyDown}
                   onChange={this.onChange}
                   onBlur={this.onBlur}
                   autoFocus={true}
                   value={value}
                   placeholder={placeholder}
            />
        </span>;
    }
}

Input.defaultProps = {
    cancelOnBlur: true,
};

export default Input