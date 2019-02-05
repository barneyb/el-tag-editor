import React from "react";
import TagEditor from "./components/TagEditor";
import parse, { parseTag } from "./util/parse";
import unparse from "./util/unparse";

// this is the entry point, so it'll never be used
// noinspection JSUnusedGlobalSymbols
class index extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            tags: parse(props.tagList),
        };
        this.addTag = this.addTag.bind(this);
        this.renameTag = this.renameTag.bind(this);
        this.setTagNumber = this.setTagNumber.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
    }

    // Yes, this is as-intended. This bridges into React from the non-React
    // external world. That edge has to live _somewhere_.
    UNSAFE_componentWillReceiveProps(props) {
        if (this.props.tagList === props.tagList) {
            return;
        }
        this.setState({
            tags: parse(props.tagList),
        })
    }

    addTag(tag) {
        if (! tag) {
            // adding nothing is a editor-level commit
            this.props.onCommit && this.props.onCommit();
            return;
        }
        this.setState(state => {
            const t = parseTag(tag);
            const i = state.tags.findIndex(it => it.tag === t.tag);
            const newTags = state.tags.slice(0);
            if (i < 0) {
                // new
                newTags.push(t)
            } else {
                const existing = newTags[i];
                newTags[i] = {
                    ...t,
                    number: existing.number + t.number,
                    explicit: true,
                }
            }
            return {
                tags: newTags,
            };
        }, () => {
            this.props.onChange(unparse(this.state.tags));
        })
    }

    renameTag(tag, newTag) {
        if (! newTag) {
            // renamed to nothing means delete
            this.deleteTag(tag);
            return;
        }
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            if (i < 0) {
                return;
            }
            const newTags = state.tags.slice(0);
            const t = parseTag(newTag);
            if (!t.explicit) {
                // let whatever was there before remain
                delete t.number;
                delete t.explicit;
            }
            newTags[i] = {
                ...newTags[i],
                ...t,
            };
            return {
                tags: newTags,
            };
        }, () => {
            this.props.onChange(unparse(this.state.tags));
        })
    }

    setTagNumber(tag, number) {
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            if (i < 0) {
                return;
            }
            const newTags = state.tags.slice(0);
            newTags[i] = {
                ...newTags[i],
                number: number != null ? number : 1,
                explicit: number != null,
            };
            return {
                tags: newTags,
            };
        }, () => {
            this.props.onChange(unparse(this.state.tags));
        })
    }

    deleteTag(tag) {
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            if (i < 0) {
                return;
            }
            const newTags = state.tags.slice(0);
            newTags.splice(i, 1);
            return {
                tags: newTags,
            };
        }, () => {
            this.props.onChange(unparse(this.state.tags));
        })
    }

    render() {
        const {
            debug,
            knownTags,
            nextTags,
        } = this.props;
        return <div>
            <TagEditor tags={this.state.tags}
                       addTag={this.addTag}
                       renameTag={this.renameTag}
                       setTagNumber={this.setTagNumber}
                       deleteTag={this.deleteTag}
                       knownTags={knownTags}
                       nextTags={nextTags}
            />
            {debug && <React.Fragment>
                <hr />
                <pre>tags: {JSON.stringify(this.state.tags, null, 3)}</pre>
                <hr />
                <pre>props: {JSON.stringify(this.props, null, 3)}</pre>
                <hr />
                <code>list: {unparse(this.state.tags)}</code>
            </React.Fragment>}
        </div>;
    }

}

export default index;
