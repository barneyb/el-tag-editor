import React from 'react';

class AddTag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    clear() {
        this.setState({value: ""});
    }

    onKeyDown(e) {
        switch (e.key) {
            case "Escape":
                this.clear();
                break;
            case "Enter":
                this.props.add(this.state.value);
                this.clear();
                break;
        }
    }

    onChange(e) {
        this.setState({
            value: e.target.value,
        });
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
                   value={this.state.value}
            />
        </div>;
    }
}

export default AddTag