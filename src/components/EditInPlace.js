import React from "react";
import Input from "./Input";
import Label from "./Label";

const VIEW = 0;
const EDIT = 1;

class EditInPlace extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            mode: VIEW,
        };
        this.startEditing = this.startEditing.bind(this);
        this.updateEdit = this.updateEdit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    startEditing() {
        this.setState(state => {
            if (state.mode === VIEW) {
                return {
                    mode: EDIT,
                    newValue: this.props.value,
                }
            }
        })
    }

    updateEdit(newValue) {
        const {
            sanitize,
        } = this.props;
        this.setState({
            newValue: sanitize ? sanitize(newValue) : newValue,
        });
    }

    commitEdit() {
        this.props.onCommit(this.state.newValue);
        this.cancelEdit();
    }

    cancelEdit() {
        this.setState({
            mode: VIEW,
            newValue: undefined,
        });
    }

    render() {
        const {
            value,
            onKeyDown,
            className,
        } = this.props;
        const {
            mode,
            newValue,
        } = this.state;
        if (mode === VIEW) {
            return <Label className={className}
                          label={value}
                          onClick={this.startEditing}
                          onKeyDown={onKeyDown}
            />;
        }
        return <Input className={className}
                      value={newValue}
                      onChange={this.updateEdit}
                      onCancel={this.cancelEdit}
                      onCommit={this.commitEdit}
        />;
    }

}

export default EditInPlace;
