import React from "react";
import Input from "./Input";

const VIEW = 0;
const EDIT = 1;

class Tag extends React.PureComponent {

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
                    newTag: this.props.tag,
                }
            }
        })
    }

    updateEdit(newTag) {
        this.setState({
            newTag,
        });
    }

    commitEdit() {
        this.props.onRename(this.state.newTag);
        this.cancelEdit();
    }

    cancelEdit() {
        this.setState({
            mode: VIEW,
            newTag: undefined,
        });
    }

    render() {
        const {
            tag,
        } = this.props;
        const {
            mode,
            newTag,
        } = this.state;
        if (mode === VIEW) {
            return <span onClick={this.startEditing}>{tag}</span>;
        }
        return <Input value={newTag}
                      onChange={this.updateEdit}
                      onCancel={this.cancelEdit}
                      onCommit={this.commitEdit}
        />;
    }
}

export default Tag;
