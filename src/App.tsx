import TableOfContent from './components/TableOfContent/TableOfContent.component';

import './App.css';

function Content() {
    return (
        <>
            <h1>Introduction to React Components</h1>
            <section>
                <h2>Understanding Functional Components</h2>
                <article>
                    <h3>What are Functional Components?</h3>
                    Functional components are the most common way to write React components today.
                    They are JavaScript functions that accept props as an argument and return React
                    elements.
                </article>
                <article>
                    <h3>Benefits of Functional Components</h3>
                    Functional components are generally easier to read and write, especially with
                    the introduction of Hooks. They also tend to be more performant in many cases.
                </article>
                <h2>Using Hooks with Functional Components</h2>
                <article>
                    <h3>State Hook (useState)</h3>
                    The `useState` hook allows you to add state to functional components. It returns
                    a stateful value and a function to update it.
                </article>
                <article>
                    <h3>Effect Hook (useEffect)</h3>
                    The `useEffect` hook allows you to perform side effects in functional
                    components, such as fetching data or subscribing to events.
                </article>
            </section>
            <section>
                <h2>Class Components (Legacy)</h2>
                <article>
                    <h3>Structure of Class Components</h3>
                    Class components are ES6 classes that extend `React.Component`. They have their
                    own state and lifecycle methods.
                </article>
                <article>
                    <h3>Lifecycle Methods</h3>
                    Class components use lifecycle methods like `componentDidMount`,
                    `componentDidUpdate`, and `componentWillUnmount` to handle side effects and
                    component updates.
                </article>
                <article>
                    <h3>When to Use Class Components</h3>
                    While functional components with Hooks are generally preferred, you might
                    encounter class components in older codebases or when using certain features not
                    yet fully supported by Hooks (though this is becoming less common).
                    <article>
                        <h4>Example Class Component Structure</h4>
                        Here's a basic example of what a class component looks like:
                        <pre>
                            <code>
                                {`import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
`}
                            </code>
                        </pre>
                    </article>
                </article>
                <article>
                    <h3>Limitations of Class Components</h3>
                    Class components can be more verbose and harder to reason about, especially with
                    complex lifecycle logic.
                </article>
            </section>
            <section>
                <h2>Choosing Between Functional and Class Components</h2>
                <article>
                    <h3>Modern React Development</h3>
                    For new projects and components, functional components with Hooks are the
                    recommended approach due to their simplicity and the power of Hooks.
                </article>
                <article>
                    <h3>Maintaining Existing Code</h3>
                    When working with existing codebases that use class components, it's important
                    to understand how they work, but you can gradually refactor them to functional
                    components if desired.
                </article>
                <article>
                    <h3>Performance Considerations</h3>
                    While performance differences are often negligible for most applications,
                    functional components with Hooks can sometimes offer better performance
                    optimizations.
                </article>
                <article>
                    <h3>Readability and Maintainability</h3>
                    Functional components with Hooks are generally considered more readable and
                    easier to maintain due to their simpler structure and the way Hooks manage state
                    and side effects.
                </article>
            </section>
        </>
    );
}

function App() {
    return (
        <div className="container">
            <main>
                <Content />
            </main>
            <aside>
                <TableOfContent contentSelector="main" />
            </aside>
        </div>
    );
}

export default App;
