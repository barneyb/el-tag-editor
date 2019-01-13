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

The target use case (exemplified by `dist/index.html`) is like this:

    <div id="unnamed"></div>
    <div id="barney"></div>
    <script src="https://unpkg.com/react@16.7.0/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js"></script>
    <script type="text/javascript" src="Greet.js"></script>
    <script type="text/javascript">
      ReactDOM.render(React.createElement(Greet.default),
        document.getElementById("unnamed"));
      ReactDOM.render(React.createElement(Greet.default, {
          name: "Barney"
        }),
        document.getElementById("barney"));
    </script>

Specifically, the hosting app will ensure React and ReactDOM are
available, load the component, and then use it however it wants
to. The component can also be depended on and imported into a
more normal "all-in-one" React app (e.g., via Create React App)
and used that way.
