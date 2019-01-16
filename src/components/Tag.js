import React from "react";
import EditInPlace from "./EditInPlace";

class Tag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doKeyPress = this.doKeyPress.bind(this);
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
                            onCommit={onRename}
                            onKeyPress={this.doKeyPress}
        />;
    }
}

export default Tag;
