import React from "react";
import Tag from "./Tag";
import Number from "./Number";
import Label from "./Label";
import EventSink from "./EventSink";

class Pill extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doDeleteClick = this.doDeleteClick.bind(this);
        this.doRename = this.doRename.bind(this);
        this.doSetNumber = this.doSetNumber.bind(this);
    }

    doRename(newTag) {
        const {
            tag,
            onRename,
        } = this.props;
        EventSink.renameTag(tag, newTag);
        onRename && onRename(newTag);
    }

    doSetNumber(number) {
        const {
            tag,
            onSetNumber,
        } = this.props;
        if (number == null) {
            EventSink.clearNumber(tag);
        } else {
            EventSink.setNumber(tag, number);
        }
        onSetNumber && onSetNumber(number);
    }

    doDeleteClick(e) {
        e.stopPropagation();
        let {
            tag,
            onDelete,
        } = this.props;
        EventSink.deleteTag(tag);
        onDelete && onDelete();
    }

    render() {
        let {
            tag,
            number,
            explicit,
            onDelete,
        } = this.props;
        return <span className="Pill">
            <Tag tag={tag}
                 onRename={this.doRename}
                 onDelete={onDelete}
            />
            {explicit && <Number n={number}
                                 onSet={this.doSetNumber}
            />}
            <Label className="delete"
                   label={"\u2715"}
                   onClick={this.doDeleteClick}
                   preventFocus
            />
        </span>;
    }
}

export default Pill;
