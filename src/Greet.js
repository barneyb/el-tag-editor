import React from "react";
import Name from "./Name";

const Greet = props =>
    React.createElement('h1', {
	onClick: (e) => {
	    console.log("click", props.name);
	    props.onClick && props.onClick(e);
	}
    }, [
	"Hello, ",
	React.createElement(Name, {
	    key: 'name',
	    name: props.name
	})
    ]);

export default Greet;
