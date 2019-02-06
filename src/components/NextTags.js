import React from "react";
import EventSink from "./EventSink";

class NextTags extends React.PureComponent {

    constructor(props) {
        super(props);
        this.doClick = this.doClick.bind(this);
    }

    doClick(e, tag) {
        const {
            onSelect,
        } = this.props;
        EventSink.pickSuggestion(tag);
        onSelect && onSelect(tag);
    }

    render() {
        const {
            nextTags,
        } = this.props;
        let list;
        if (nextTags == null) {
            list = <div className="Loading" />;
        } else if (nextTags.length === 0) {
            list = null;
        } else {
            list = <ul>
                {nextTags.map(it =>
                    <li key={it.t}
                        className="NextTag"
                        onClick={e => this.doClick(e, it.t)}
                    >{it.t}</li>)}
            </ul>;
        }
        return <div className="NextTags">
            {list}
        </div>
    }

}

export default NextTags;