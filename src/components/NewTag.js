import React from "react";
import Input from "./Input";
import memoize from "memoize-one";
import { sanitizeCompoundTag } from "../util/sanitize";
import toWords from "../util/toWords";

const MAX_COMPLETIONS = 10;

const filterTags = (knownTags, value) => {
    const ordered = [];
    const unordered = [];
    const words = toWords(value);
    tagLoop:
    for (const t of knownTags) {
        let start = 0;
        let inOrder = true;
        for (const w of words) {
            if (inOrder) {
                const idx = t.indexOf(w, start);
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
    if (ordered.length === 0 && unordered.length === 0) return [];
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