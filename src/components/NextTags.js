import React from "react";

class NextTags extends React.PureComponent {

    render() {
        const {
            nextTags,
            onSelect,
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
                        onClick={() => onSelect(it.t)}
                    >{it.t}</li>)}
            </ul>;
        }
        return <div className="NextTags">
            {list}
        </div>
    }

}

export default NextTags;