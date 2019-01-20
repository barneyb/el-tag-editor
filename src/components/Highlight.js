import React from "react";

class Highlight extends React.PureComponent {

    render() {
        const {
            terms: termArray,
            children: text, // must be a string!
        } = this.props;
        let start = 0;
        let moreToDo;
        const buffer = [];
        const terms = {};
        for (const t of termArray) {
            terms[t] = null;
        }
        do {
            moreToDo = false;
            let idx = text.length, term;
            for (const t in terms) {
                // noinspection JSUnfilteredForInLoop
                const i = text.indexOf(t, start);
                if (i >= 0 && i < idx) {
                    moreToDo = true;
                    idx = i;
                    term = t;
                }
            }
            if (moreToDo) {
                if (idx > start) {
                    buffer.push(text.substring(start, idx))
                }
                buffer.push(<strong key={start}>{text.substr(idx, term.length)}</strong>);
                start = idx + term.length;
                delete terms[term];
            }
        } while (moreToDo);
        if (start < text.length) {
            buffer.push(text.substr(start));
        }
        return buffer;
    }
}

export default Highlight;