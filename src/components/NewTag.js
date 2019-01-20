import React from "react";
import Input from "./Input";
import memoize from "memoize-one";
import { sanitizeCompoundTag } from "../util/sanitize";
import toWords from "../util/toWords";

const MAX_COMPLETIONS = 10;

const filterTags = (knownTags, lcTags, value) => {
    const ordered = [];
    const unordered = [];
    const words = toWords(value.toLowerCase());
    tagLoop:
    for (let i = 0; i < knownTags.length; i++) {
        const t = knownTags[i];
        const lct = lcTags[i];
        let start = 0;
        let inOrder = true;
        for (const w of words) {
            if (inOrder) {
                const idx = lct.indexOf(w, start);
                if (idx >= start) {
                    start = idx + 1;
                } else {
                    inOrder = false;
                }
            }
            if (! inOrder) {
                if (ordered.length + unordered.length >= MAX_COMPLETIONS) {
                    // won't be useful...
                    continue tagLoop;
                }
                const idx = t.indexOf(w);
                if (idx < 0) continue tagLoop;
            }
        }
        // found all words
        if (inOrder) {
            ordered.push(t);
            if (ordered.length === MAX_COMPLETIONS) {
                return ordered;
            }
        } else {
            unordered.push(t);
        }
    }
    if (ordered.length === 0 && unordered.length === 0) return null;
    // need some of the unordered results
    ordered.push(...unordered);
    return ordered.slice(0, MAX_COMPLETIONS);
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
        this.lcArray = memoize(strings =>
            strings.map(s => s.toLowerCase()));
        this.getCompletions = memoize(filterTags);
    }

    focus() {
        this.inputRef.current.focus();
    }

    clear() {
        this.setState({
            value: "",
        });
    }

    doChange(tag) {
        this.setState({
            value: tag,
        });
    }

    doCommit(val) {
        const {
            onCommit,
        } = this.props;
        const value = val || this.state.value;
        if (onCommit && value && value.trim().length > 0) {
            onCommit(value.trim());
        }
        this.clear();
    }

    doCancel() {
        this.clear();
    }

    render() {
        const {
            value,
        } = this.state;
        const {
            knownTags,
        } = this.props;
        const completions = knownTags && value.trim().length > 0
            ? this.getCompletions(knownTags, this.lcArray(knownTags), value)
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