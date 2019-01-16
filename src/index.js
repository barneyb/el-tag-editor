import React from "react";
import TagEditor from "./components/TagEditor";
import parse from "./util/parse";
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
        this.setState(parse(props.tagList))
    }

    addTag(tag) {
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            const newTags = state.tags.slice(0);
            if (i < 0) {
                // new
                newTags.push({
                    tag,
                })
            } else {
                const t = newTags[i];
                newTags[i] = {
                    tag,
                    number: (t.number == null ? 1 : t.number) + 1,
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
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            if (i < 0) {
                return;
            }
            const newTags = state.tags.slice(0);
            newTags[i] = {
                ...newTags[i],
                tag: newTag,
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
                number,
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
        return <div>
            <TagEditor tags={this.state.tags}
                       addTag={this.addTag}
                       renameTag={this.renameTag}
                       setTagNumber={this.setTagNumber}
                       deleteTag={this.deleteTag} />
            <hr />
            <code>{unparse(this.state.tags)}</code>
            <pre style={{
                padding: "5px",
                border: "1px solid #ff0",
                backgroundColor: "#ffe",
            }}>
                {JSON.stringify(this.state.tags, null, 3)}
            </pre>
        </div>;
    }

}

export default index;
