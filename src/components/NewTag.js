import React from "react";
import Input from "./Input";
import memoize from "memoize-one";
import { sanitizeCompoundTag } from "../util/sanitize";

const MAX_COMPLETIONS = 10;

const filterTags = (knownTags, value) => {
    const ordered = [];
    const words = value.trim()
        .toLowerCase()
        .split(" ")
        .map(it => it.trim())
        .filter(it => it.length > 0);
    tagLoop:
    for (const t of knownTags) {
        let start = 0;
        for (const w of words) {
            const idx = t.indexOf(w, start);
            if (idx < 0) continue tagLoop; // didn't match :(
            start = idx + 1;
        }
        // if we got here, we found all words, in order
        ordered.push(t);
        if (ordered.length === MAX_COMPLETIONS) {
            // woo!
            return ordered;
        }
    }
    return ordered.length === 0 ? null : ordered;
};

class NewTag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.inputRef = React.createRef();
        this.doChange = this.doChange.bind(this);
        this.doCommit = this.doCommit.bind(this);
        this.doCancel = this.doCancel.bind(this);
        this.getCompletions = memoize(filterTags);
    }

    focus() {
        this.inputRef.current.focus();
    }

    doChange(tag) {
        this.setState({
            value: tag,
        });
    }

    doCommit() {
        const {
            onCommit,
        } = this.props;
        // this is complicated because doChange might be followed by doCommit in
        // the same tick, and thus React will not have updated state by the time
        // we get here. So we have to use setState to read the changed value.
        this.setState(s => {
            const value = s.value;
            if (value && value.trim().length > 0) {
                onCommit(value.trim());
            }
            return {
                value: "",
            }
        });
    }

    doCancel() {
        this.setState({
            value: "",
        });
    }

    render() {
        const {
            value,
        } = this.state;
        const {
            knownTags,
        } = this.props;
        const completions = knownTags && value.trim().length > 0
            ? this.getCompletions(knownTags, value)
            : null;
        return <Input value={value}
                      className="NewTag"
                      placeholder="add..."
                      cancelOnBlur={false}
                      sanitize={sanitizeCompoundTag}
                      onChange={this.doChange}
                      onCommit={this.doCommit}
                      onCancel={this.doCancel}
                      completions={completions}
                      ref={this.inputRef}
        />;
    }

}

export default NewTag;