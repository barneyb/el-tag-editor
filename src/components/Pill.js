import React from "react";
import Tag from "./Tag";
import Number from "./Number";
import Label from "./Label";

class Pill extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doDeleteClick = this.doDeleteClick.bind(this);
    }

    doDeleteClick(e) {
        e.stopPropagation();
        this.props.onDelete();
    }

    render() {
        let {
            tag,
            number,
            explicit,
            onRename,
            onSetNumber,
            onDelete,
        } = this.props;
        return <code className="Pill">
            <Tag tag={tag}
                 onRename={onRename}
                 doDelete={onDelete}
            />
            {explicit && <Number n={number}
                                 onSet={onSetNumber}
            />}
            <Label className="delete"
                   label="x"
                   onClick={this.doDeleteClick}
                   preventFocus
            />
        </code>;
    }
}

export default Pill;
