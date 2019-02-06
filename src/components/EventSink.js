import {parseTag} from "../util/parse";

const SESSION_ID = "sid";
let sessionCounter = 0;

class EventSink {

    constructor() {
        this.listeners = [];
        this.attributes = {};
        this.resetSession();
    }

    resetSession() {
        this.setAttribute(SESSION_ID, ++sessionCounter);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    register(handler) {
        this.listeners.push(handler);
    }

    _dispatch(name, data) {
        for (const l of this.listeners) {
            l(name, {
                ...this.attributes,
                ...data,
            });
        }
    }

    addTag(tag) {
        let data = parseTag(tag);
        if (! data.explicit) delete data.number;
        delete data.explicit;
        this._dispatch("add", data);
    }

    renameTag(tag, newTag) {
        this._dispatch("rename", {
            tag,
            newTag,
        });
    }

    deleteTag(tag) {
        this._dispatch("delete", {
            tag,
        });
    }

    pickSuggestion(tag) {
        this._dispatch("select_suggestion", {
            tag
        });
    }

    pickCompletion(tag, text) {
        this._dispatch("select_completion", {
            tag,
            text,
        });
    }

    setNumber(tag, number) {
        this._dispatch("set_number", {
            tag,
            number,
        });
    }

    clearNumber(tag) {
        this._dispatch("clear_number", {
            tag,
        })
    }

}

export default new EventSink();