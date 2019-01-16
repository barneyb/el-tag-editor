import React from 'react';

class Input extends React.PureComponent {

    constructor(props) {
        super(props);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onKeyDown(e) {
        switch (e.key) {
            case "Escape":
                this.props.onCancel();
                break;
            case "Enter":
                this.props.onCommit();
                break;
        }
    }

    onChange(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        return <div style={{
            display: "inline-block",
            padding: "1px 3px",
            margin: "1px 5px 1px 0",
            border: "1px solid #d00",
            backgroundColor: "#fee",
        }}>
            <input onKeyDown={this.onKeyDown}
                   onChange={this.onChange}
                   autoFocus={true}
                   value={this.props.value}
            />
        </div>;
    }
}

export default Input