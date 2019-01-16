import React from "react";
import EditInPlace from "./EditInPlace";

class Number extends React.PureComponent {

    constructor(props) {
        super(props);
        this.sanitize = this.sanitize.bind(this);
        this.doCommit = this.doCommit.bind(this);
        this.doKeyPress = this.doKeyPress.bind(this);
    }

    sanitize(val) {
        val = val.trim();
        let result = "";
        let foundPeriod = false;
        for (let i = 0; i < val.length; i++) {
            const c = val.charAt(i);
            if (c === ".") {
                if (foundPeriod) {
                    continue;
                }
                foundPeriod = true;
            } else if (c < "0" || c > "9") {
                continue;
            }
            result += c;
        }
        return result;
    }

    doCommit(val) {
        this.props.onSet(parseFloat(val));
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
        } = this.props;
        return <EditInPlace value={n}
                            sanitize={this.sanitize}
                            onCommit={this.doCommit}
                            onKeyPress={this.doKeyPress}
        />;
    }
}


export default Number;
