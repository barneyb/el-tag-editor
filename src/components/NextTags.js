import React from "react";

class NextTags extends React.PureComponent {

    render() {
        const {
            nextTags,
            onSelect,
        } = this.props;
        if (nextTags == null || nextTags.length === 0) {
            return null;
        }
        return <div className="NextTags">
            <ul>
                {nextTags.map(it =>
                    <li key={it.t}
                        className="NextTag"
                        onClick={() => onSelect(it.t)}
                    >{it.t}</li>)}
            </ul>
        </div>
    }

}

export default NextTags;