import React from "react";
import Input from "./Input";

class NewTag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.doChange = this.doChange.bind(this);
        this.doCommit = this.doCommit.bind(this);
        this.doCancel = this.doCancel.bind(this);
    }

    clear() {
        this.setState({
            value: "",
        });
    }

    doChange(tag) {
        this.setState({
            value: tag,
        });
    }

    doCommit() {
        const value = this.state.value;
        if (value && value.trim().length > 0) {
            this.props.onCommit(value.trim());
        }
        this.clear();
    }

    doCancel() {
        this.clear();
    }

    render() {
        return <Input value={this.state.value}
                      onChange={this.doChange}
                      onCommit={this.doCommit}
                      onCancel={this.doCancel}
        />;
    }

}

export default NewTag;