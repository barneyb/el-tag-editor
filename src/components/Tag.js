import React from "react";
import EditInPlace from "./EditInPlace";

class Tag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.sanitize = this.sanitize.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
    }

    // noinspection JSMethodCanBeStatic
    sanitize(val) {
        return val.trim();
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
                            sanitize={this.sanitize}
                            onCommit={onRename}
                            onKeyDown={this.doKeyDown}
        />;
    }
}

export default Tag;
