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

    deleteTag(tag) {
        this.setState(state => {
            const i = state.tags.findIndex(it => it.tag === tag);
            if (i < 0) return;
            const newTags = state.tags.slice(0);
            newTags.splice(i, 1);
            return {tags: newTags};
        }, () => {
            this.props.onChange(unparse(this.state.tags));
        })
    }

    render() {
        return <TagEditor tags={this.state.tags}
                          deleteTag={this.deleteTag} />;
    }

}

export default index;