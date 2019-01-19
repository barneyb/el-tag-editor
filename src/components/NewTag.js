import React from "react";
import Input from "./Input";
import memoize from "memoize-one";
import { sanitizeCompoundTag } from "../util/sanitize";

const MAX_COMPLETIONS = 10;

class NewTag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };
        this.doChange = this.doChange.bind(this);
        this.doCommit = this.doCommit.bind(this);
        this.doCancel = this.doCancel.bind(this);
        this.getCompletions = memoize((knownTags, value) => {
            const completions = [];
            const matches = [];
            for (const t of knownTags) {
                const idx = t.indexOf(value);
                if (idx === 0) { // prefix
                    completions.push(t);
                    if (completions.length === MAX_COMPLETIONS) {
                        return completions;
                    }
                } else if (idx > 0) { // substring
                    if (matches.length + completions.length < MAX_COMPLETIONS) {
                        matches.push(t)
                    }
                }
            }
            // if we got here, we need to add at least some of the matches
            completions.push(...matches);
            return completions.slice(0, MAX_COMPLETIONS);
        });
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

    doCommit() {
        const value = this.state.value;
        if (value && value.trim().length > 0) {
            this.props.onCommit(value.trim());
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
            ? this.getCompletions(knownTags, value)
            : null;
        const input = <Input value={value}
                             placeholder="add..."
                             cancelOnBlur={false}
                             sanitize={sanitizeCompoundTag}
                             onChange={this.doChange}
                             onCommit={this.doCommit}
                             onCancel={this.doCancel}
        />;
        return <span>
            {input}
            <em>{completions && completions.join(",")}</em>
            </span>;
    }

}

export default NewTag;