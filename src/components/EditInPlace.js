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
        this.labelRef = React.createRef();
        this.doClick = this.doClick.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
        this.updateEdit = this.updateEdit.bind(this);
        this.commitEdit = this.commitEdit.bind(this);
        this.cancelEdit = this.cancelEdit.bind(this);
    }

    doKeyDown(e) {
        const {
            onKeyDown,
        } = this.props;
        if (e.key === "Enter") {
            this.beginEditing();
        } else {
            onKeyDown && onKeyDown(e);
        }
    }

    doClick(e) {
        e.stopPropagation();
        this.beginEditing();
    }

    beginEditing() {
        this.setState(state => {
            if (state.mode === VIEW) {
                return {
                    mode: EDIT,
                    newValue: this.props.value,
                }
            }
        });
    }

    updateEdit(newValue) {
        this.setState({
            newValue,
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
            }, () =>
                this.labelRef.current.focus(),
        );
    }

    render() {
        const {
            value,
            className,
            sanitize,
        } = this.props;
        const {
            mode,
            newValue,
        } = this.state;
        if (mode === VIEW) {
            return <Label className={className}
                          label={value}
                          onClick={this.doClick}
                          onKeyDown={this.doKeyDown}
                          ref={this.labelRef}
            />;
        }
        return <Input className={className}
                      value={newValue}
                      sanitize={sanitize}
                      onChange={this.updateEdit}
                      onCancel={this.cancelEdit}
                      onCommit={this.commitEdit}
        />;
    }

}

export default EditInPlace;
