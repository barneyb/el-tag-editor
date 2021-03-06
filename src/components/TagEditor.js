import React from "react";
import Pill from "./Pill";
import NewTag from "./NewTag";
import NextTags from "./NextTags";
import EventSink from "./EventSink";

class TagEditor extends React.PureComponent {

    constructor(props) {
        super(props);
        this.meRef = React.createRef();
        this.addRef = React.createRef();
        this.doClick = this.doClick.bind(this);
        this.doAdd = this.doAdd.bind(this);
    }

    doAdd(val) {
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
            EventSink.addTag(val);
            addTag(val);
        } else {
            let tag = tags[tags.length - 1].tag;
            EventSink.setNumber(tag, n);
            setTagNumber(tag, n);
        }
    }

    doClick() {
        if (this.meRef.current.contains(document.activeElement)) {
            // focus is already inside me, so do nothing
            return;
        }
        this.addRef.current.focus();
    }

    render() {
        const {
            tags,
            addTag,
            renameTag,
            setTagNumber,
            deleteTag,
            knownTags,
            nextTags,
        } = this.props;
        return <div>
            <div className="TagEditor"
                 onClick={this.doClick}
                 ref={this.meRef}
            >
                {tags.map(t =>
                    <Pill key={t.tag}
                          onRename={newTag => renameTag(t.tag, newTag)}
                          onSetNumber={number => setTagNumber(t.tag, number)}
                          onDelete={() => deleteTag(t.tag)}
                          {...t}
                    />)}
                <NewTag onCommit={this.doAdd}
                        knownTags={knownTags}
                        ref={this.addRef}
                />
            </div>
            <NextTags nextTags={nextTags}
                      onSelect={addTag}
            />
        </div>;
    }
}

export default TagEditor;
