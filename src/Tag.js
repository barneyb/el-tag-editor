import React from "react";

class Tag extends React.Component {
    render() {
        let n = this.props.number;
        return <code style={{
            display: "inline-block",
            padding: "1px 3px",
            margin: "1px 5px 1px 0",
            border: "1px solid #09f",
            backgroundColor: "#f0f7ff",
        }}>
            {this.props.tag}
            {n != null && n !== 1 && (":" + n)}
        </code>;
    }
}

export default Tag;
