# EL Tag Editor

I'm a React component for editing a set of unique tags, each of which may have
an associated number (integer or float). The tags are canonically represented as
a comma-delimited string, with the optional number suffixed with a comma. For
example (one per line):

    tomato juice:4, vodka:1, ice:2
    gym, weights, treadmill:30
    maui, ribeye, sushi

Editing these lists as text is fairly straightforward, but it can be repetitive
(and error prone) if you do it a lot. Thus this component, which aims to reduce
these problems, without reducing flexibility.

## Build and Run

    npm install
    npm run build

Then open the `dist/index.html` file in your browser.
