import React from "react";
import Tag from "./Tag";
import parse from "./parse";

class TagEditor extends React.PureComponent {

    render() {
        const objs = parse(this.props.tagList);
        return <div>
            <textarea rel="from-react"
                      value={this.props.tagList}
                      onChange={e => this.props.onChange(e.target.value)} />
            <div style={{
                padding: "3px",
                border: "1px solid #eee",
            }}>
                {objs.map(t =>
                    <Tag key={t.tag}
                         {...t}
                    />)}
            </div>
            <pre style={{
                padding: "5px",
                border: "1px solid #ff0",
                backgroundColor: "#ffe",
            }}>
                {JSON.stringify(objs, null, 3)}
            </pre>
        </div>;
    }
}

export default TagEditor;
