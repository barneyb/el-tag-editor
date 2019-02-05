import React from "react";

class Highlight extends React.PureComponent {

    render() {
        const {
            terms,
            children: text, // must be a string!
        } = this.props;
        const termArray = [];
        for (const t of terms) {
            termArray.push(t.toLowerCase());
        }
        const lcText = text.toLowerCase();
        let start = 0;
        const buffer = [];
        let moreToDo = true;
        while (moreToDo) {
            moreToDo = false;
            let idx = text.length, term;
            for (const t of termArray) {
                const i = lcText.indexOf(t, start);
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
            }
        }
        if (start < text.length) {
            buffer.push(text.substr(start));
        }
        return buffer;
    }
}

export default Highlight;