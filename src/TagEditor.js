import React from "react";

class TagEditor extends React.Component {
    render() {
        return React.createElement('textarea', {
            rel: "from-react",
            value: this.props.tags,
            onChange: e => this.props.onChange(e.target.value),
        });
    }
}

export default TagEditor;
