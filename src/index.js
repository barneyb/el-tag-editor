import React from "react";
import TagEditor from "./TagEditor";
import parse from "./parse";
import unparse from "./unparse";

// this is the entry point, so it'll never be used
// noinspection JSUnusedGlobalSymbols
export default props =>
    <TagEditor tags={parse(props.tagList)}
        onChange={tags => props.onChange(unparse(tags))}/>;
