import React from "react";
import Pill from "./Pill";
import NewTag from "./NewTag";

class TagEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.addTagOrNumber = this.addTagOrNumber.bind(this);
    }

    addTagOrNumber(val) {
        const {
            tags,
            addTag,
            setTagNumber,
        } = this.props;
        if (tags.length === 0) {
            addTag(val);
            return;
        }
        const n = parseFloat(val.trim());
        if (isNaN(n)) {
            addTag(val);
        } else {
            setTagNumber(tags[tags.length - 1].tag, n);
        }
    }

    render() {
        const {
            tags,
            renameTag,
            setTagNumber,
            deleteTag,
        } = this.props;
        return <div style={{
            padding: "3px",
            border: "1px solid #eee",
        }}>
            {tags.map(t =>
                <Pill key={t.tag}
                      onRename={newTag => renameTag(t.tag, newTag)}
                      onSetNumber={number => setTagNumber(t.tag, number)}
                      onDelete={() => deleteTag(t.tag)}
                      {...t}
                />)}
            <NewTag onCommit={this.addTagOrNumber} />
        </div>;
    }
}

export default TagEditor;
