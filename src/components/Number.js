import React from "react";
import EditInPlace from "./EditInPlace";

class Number extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doKeyPress = this.doKeyPress.bind(this);
    }

    doKeyPress(e) {
        switch (e.key) {
            case "Delete":
                this.props.onSet();
                break;
        }
    }

    render() {
        const {
            n,
            onSet,
        } = this.props;
        return <EditInPlace value={n}
                            onCommit={onSet}
                            onKeyPress={this.doKeyPress}
        />;
    }
}


export default Number;
