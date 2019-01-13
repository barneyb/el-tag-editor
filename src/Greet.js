import React from "react";
import Name from "./Name";

const Greet = props =>
    React.createElement('h1', null, [
	"Hello, ",
	React.createElement(Name, {
	    key: 'name',
	    name: props.name
	})
    ]);

export default Greet;
