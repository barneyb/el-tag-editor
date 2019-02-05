import React from "react";
import EditInPlace from "./EditInPlace";
import { sanitizeNumber } from "../util/sanitize";

class Number extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doCommit = this.doCommit.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
    }

    doCommit(val) {
        val = parseFloat(val);
        if (isNaN(val)) {
            val = null;
        }
        this.props.onSet(val);
    }

    doKeyDown(e) {
        switch (e.key) {
            case "Delete":
            case "Backspace":
                this.props.onSet();
                break;
        }
    }

    render() {
        const {
            n,
        } = this.props;
        return <EditInPlace className="EditInPlace number"
                            value={n}
                            sanitize={sanitizeNumber}
                            onCommit={this.doCommit}
                            onKeyDown={this.doKeyDown}
        />;
    }
}


export default Number;
