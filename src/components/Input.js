import React from 'react';

class Input extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doKeyDown = this.doKeyDown.bind(this);
        this.doChange = this.doChange.bind(this);
        this.doBlur = this.doBlur.bind(this);
    }

    doKeyDown(e) {
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

    doChange(e) {
        const v = e.target.value;
        const sanitize = this.props.sanitize;
        this.props.onChange(sanitize ? sanitize(v) : v);
    }

    doBlur() {
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
            completions,
        } = this.props;
        return <span className={"Input " + className}
                     style={{
                        position: "relative",
                     }}>
            <input onKeyDown={this.doKeyDown}
                   onChange={this.doChange}
                   onBlur={this.doBlur}
                   autoFocus={true}
                   value={value}
                   placeholder={placeholder}
            />
            {completions && <div className="Completions"
                                 style={{
                                     position: "absolute",
                                 }}>
                <ul>
                    {completions.map(it =>
                        <li key={it}>{it}</li>
                    )}
                </ul>
            </div>}
        </span>;
    }
}

Input.defaultProps = {
    cancelOnBlur: true,
};

export default Input