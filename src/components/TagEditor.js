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
            knownTags,
        } = this.props;
        return <div className="TagEditor">
            {tags.map(t =>
                <Pill key={t.tag}
                      onRename={newTag => renameTag(t.tag, newTag)}
                      onSetNumber={number => setTagNumber(t.tag, number)}
                      onDelete={() => deleteTag(t.tag)}
                      {...t}
                />)}
            <NewTag onCommit={this.addTagOrNumber}
                    knownTags={knownTags}
            />
        </div>;
    }
}

export default TagEditor;
