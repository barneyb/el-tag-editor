# React Module Demo

I'm a very simple demonstration of a React Component producing module,
designed to be `<script>`-loaded onto a page for some other piece of
code to mount, bundled using Webpack.

To build:

    npm install
    npm run build

Then open the `dist/index.html` file in your browser. The component
itself _is not_ transpiled, but it _is_ using newer ES features (e.g.,
arrow functions), so you'll need a newer browser in order to view.

The target use case is for a hosting app to ensure React is available,
load the component, and then use it however it wants to. The component
can also be depended on and imported into a more normal "all-in-one"
React app (e.g., via Create React App) and used that way. Check out
`dist/index.html` for a very simple driver in the former style.
