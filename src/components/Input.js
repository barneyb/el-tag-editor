import React from 'react';
import toWords from "../util/toWords";
import Highlight from "./Highlight";
import EventSink from "./EventSink";

class Input extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showCompletions: true,
            selectedIndex: 0,
        };
        this.inputRef = React.createRef();
        this.doComplete = this.doComplete.bind(this);
        this.doKeyDown = this.doKeyDown.bind(this);
        this.doChange = this.doChange.bind(this);
        this.doBlur = this.doBlur.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.value !== state.prevValue) {
            return {
                showCompletions: true,
                selectedIndex: 0,
                prevValue: props.value,
            };
        }
        return null; // do nothing
    }

    focus() {
        this.inputRef.current.focus();
    }

    doKeyDown(e) {
        const {
            value,
            onChange,
            onCancel,
            onCommit,
        } = this.props;
        const completionsActive = this.state.showCompletions && this.props.completions;
        let completion = undefined;
        switch (e.key) {
            case "ArrowUp":
                if (completionsActive) e.preventDefault();
                this.setState((s, p) => {
                    if (s.showCompletions && p.completions && s.selectedIndex > 0) {
                        return {
                            selectedIndex: s.selectedIndex - 1,
                        };
                    }
                });
                break;
            case "ArrowDown":
                if (completionsActive) e.preventDefault();
                this.setState((s, p) => {
                    if (s.showCompletions && p.completions && s.selectedIndex < p.completions.length - 1) {
                        return {
                            selectedIndex: s.selectedIndex + 1,
                        };
                    }
                });
                break;
            case "Escape":
                if (completionsActive) e.preventDefault();
                this.setState((s, p) => {
                    if (s.showCompletions && p.completions) {
                        return {
                            showCompletions: false,
                        }
                    } else if (onCancel) {
                        onCancel();
                    }
                });
                break;
            case "Tab":
                if (e.shiftKey) break;
                if (completionsActive) {
                    e.preventDefault();
                    // assume pre-sanitized....
                    completion = this.props.completions[this.state.selectedIndex];
                    EventSink.pickCompletion(completion, value);
                    onChange(completion);
                }
                break;
            case "Enter":
                if (completionsActive) {
                    e.preventDefault();
                    // assume pre-sanitized....
                    completion = this.props.completions[this.state.selectedIndex];
                    EventSink.pickCompletion(completion, value);
                    onChange(completion);
                }
                if (onCommit) {
                    e.preventDefault();
                    onCommit(completion);
                }
                break;
        }
    }

    doChange(e) {
        const v = e.target.value;
        const sanitize = this.props.sanitize;
        this.props.onChange(sanitize ? sanitize(v) : v);
    }

    doBlur() {
        const {
            cancelOnBlur,
            onCancel,
        } = this.props;
        cancelOnBlur && onCancel && onCancel();
        this.setState({
            showCompletions: false,
        });
    }

    doComplete(e, tag) {
        const {
            value,
            onChange,
            onCommit,
        } = this.props;
        EventSink.pickCompletion(tag, value);
        onChange(tag);
        onCommit && onCommit(tag);
    }

    render() {
        const {
            value,
            placeholder,
            className,
            completions,
            autoFocus,
        } = this.props;
        const {
            showCompletions,
            selectedIndex,
        } = this.state;
        let compEl;
        if (completions && showCompletions) {
            const terms = toWords(value);
            compEl = <div className="Completions">
                <ul>
                    {completions.map((it, i) =>
                        <li key={it}
                            className={selectedIndex === i ? "active" : null}
                            onMouseDown={(e) => this.doComplete(e, it)}
                        ><Highlight terms={terms}>{it}</Highlight></li>,
                    )}
                </ul>
            </div>;
        }
        return <span className={"Input " + className}>
            <input onKeyDown={this.doKeyDown}
                   onChange={this.doChange}
                   onBlur={this.doBlur}
                   autoFocus={autoFocus}
                   value={value}
                   placeholder={placeholder}
                   ref={this.inputRef}
            />
            {compEl}
        </span>;
    }
}

Input.defaultProps = {
    autoFocus: true,
    cancelOnBlur: true,
};

export default Input