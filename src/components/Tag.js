import React from "react";
import EditInPlace from "./EditInPlace";
import { sanitizeCompoundTag } from "../util/sanitize";
import EventSink from "./EventSink";

class Tag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doKeyDown = this.doKeyDown.bind(this);
    }

    doKeyDown(e) {
        switch (e.key) {
            case "Delete":
            case "Backspace":
                let {
                    tag,
                    onDelete,
                } = this.props;
                onDelete && onDelete();
                EventSink.deleteTag(tag);
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
