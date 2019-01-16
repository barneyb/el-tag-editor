import React from "react";
import EditInPlace from "./EditInPlace";

class Tag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.sanitize = this.sanitize.bind(this);
        this.doKeyPress = this.doKeyPress.bind(this);
    }

    sanitize(val) {
        return val.trim();
    }

    doKeyPress(e) {
        switch (e.key) {
            case "Delete":
                this.props.doDelete();
                break;
        }
    }

    render() {
        const {
            tag,
            onRename,
        } = this.props;
        return <EditInPlace value={tag}
                            sanitize={this.sanitize}
                            onCommit={onRename}
                            onKeyPress={this.doKeyPress}
        />;
    }
}

export default Tag;
