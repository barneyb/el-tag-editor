import React from "react";
import TagEditor from "./components/TagEditor";
import parse from "./util/parse";
import unparse from "./util/unparse";

// this is the entry point, so it'll never be used
// noinspection JSUnusedGlobalSymbols
export default props =>
    <TagEditor tags={parse(props.tagList)}
        onChange={tags => props.onChange(unparse(tags))}/>;
