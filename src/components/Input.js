import React from 'react';

class Input extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showCompletions: true,
            selectedIndex: 0,
        };
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

    doKeyDown(e) {
        const {
            onCancel,
            onCommit,
        } = this.props;
        switch (e.key) {
            case "ArrowUp":
                this.setState((s, p) => {
                    if (p.completions && s.selectedIndex > 0) {
                        return {
                            selectedIndex: s.selectedIndex - 1,
                        };
                    }
                });
                break;
            case "ArrowDown":
                this.setState((s, p) => {
                    if (p.completions && s.selectedIndex < p.completions.length - 1) {
                        return {
                            selectedIndex: s.selectedIndex + 1,
                        };
                    }
                });
                break;
            case "Escape":
                onCancel && onCancel();
                break;
            case "Enter":
                onCommit && onCommit();
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
    }

    render() {
        const {
            value,
            placeholder,
            className,
            completions,
        } = this.props;
        const {
            showCompletions,
            selectedIndex,
        } = this.state;
        return <span className={"Input " + className}
                     style={{
                         position: "relative",
                     }}>
            <input onKeyDown={this.doKeyDown}
                   onChange={this.doChange}
                   onBlur={this.doBlur}
                   autoFocus={true}
                   value={value}
                   placeholder={placeholder}
            />
            {completions && showCompletions && <div className="Completions"
                                                    style={{
                                                        position: "absolute",
                                                    }}>
                <ul>
                    {completions.map((it, i) =>
                        <li key={it}
                            className={selectedIndex === i ? "active" : null}>{it}</li>,
                    )}
                </ul>
            </div>}
        </span>;
    }
}

Input.defaultProps = {
    cancelOnBlur: true,
};

export default Input