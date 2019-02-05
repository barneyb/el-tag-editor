import React from "react";
import EditInPlace from "./EditInPlace";
import { sanitizeCompoundTag } from "../util/sanitize";

class Tag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doKeyDown = this.doKeyDown.bind(this);
    }

    doKeyDown(e) {
        switch (e.key) {
            case "Delete":
            case "Backspace":
                this.props.doDelete();
                break;
        }
    }

    render() {
        const {
            tag,
            onRename,
        } = this.props;
        return <EditInPlace className="EditInPlace tag"
                            value={tag}
                            sanitize={sanitizeCompoundTag}
                            onCommit={onRename}
                            onKeyDown={this.doKeyDown}
        />;
    }
}

export default Tag;
