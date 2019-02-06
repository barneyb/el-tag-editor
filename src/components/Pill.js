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
        onRename && onRename(newTag);
        EventSink.renameTag(tag, newTag)
    }

    doSetNumber(number) {
        const {
            tag,
            onSetNumber,
        } = this.props;
        onSetNumber && onSetNumber(number);
        if (number == null) {
            EventSink.clearNumber(tag);
        } else {
            EventSink.setNumber(tag, number);
        }
    }

    doDeleteClick(e) {
        e.stopPropagation();
        let {
            tag,
            onDelete,
        } = this.props;
        onDelete && onDelete();
        EventSink.deleteTag(tag);
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
