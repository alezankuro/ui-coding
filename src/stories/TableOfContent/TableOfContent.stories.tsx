import type { Meta, StoryObj } from '@storybook/react';

import TableOfContent from 'src/components/TableOfContent';

const meta = {
    title: 'Components/TableOfContent',
    component: TableOfContent,
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta<typeof TableOfContent>;

export default meta;
type Story = StoryObj<typeof meta>;

// Simplified content with flatter heading structure
const SimpleContentWrapper = ({ contentSelector }: { contentSelector: string }) => {
    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '2rem', minHeight: '100vh' }}>
            <div style={{ flex: 1 }}>
                <main id="story-content">
                    <h1>React Development Guide</h1>

                    <h2>Getting Started</h2>
                    <p>
                        React is a popular JavaScript library for building user interfaces. This
                        guide covers the essential concepts you need to know.
                    </p>

                    <h2>Components</h2>
                    <p>
                        Components are the building blocks of React applications. They let you split
                        the UI into independent, reusable pieces.
                    </p>

                    <h3>Functional Components</h3>
                    <p>
                        Functional components are JavaScript functions that return JSX. They are the
                        modern way to write React components.
                    </p>

                    <h3>Props</h3>
                    <p>
                        Props are arguments passed into React components. They are passed to
                        components via HTML attributes.
                    </p>

                    <h3>State</h3>
                    <p>
                        State is a built-in React object that is used to contain data or information
                        about the component.
                    </p>

                    <h2>Hooks</h2>
                    <p>
                        Hooks are functions that let you "hook into" React state and lifecycle
                        features from function components.
                    </p>

                    <h3>useState</h3>
                    <p>
                        The useState Hook allows you to add state to functional components. It
                        returns a stateful value and a function to update it.
                    </p>

                    <h3>useEffect</h3>
                    <p>
                        The useEffect Hook lets you perform side effects in function components. It
                        serves the same purpose as componentDidMount, componentDidUpdate, and
                        componentWillUnmount combined.
                    </p>

                    <h3>Custom Hooks</h3>
                    <p>
                        Custom Hooks are a mechanism to reuse stateful logic between React
                        components. They are JavaScript functions whose names start with "use".
                    </p>

                    <h2>State Management</h2>
                    <p>
                        As your application grows, you'll need to manage state more effectively.
                        React provides several options for state management.
                    </p>

                    <h3>Context API</h3>
                    <p>
                        Context provides a way to pass data through the component tree without
                        having to pass props down manually at every level.
                    </p>

                    <h3>Redux</h3>
                    <p>
                        Redux is a predictable state container for JavaScript apps. It helps you
                        write applications that behave consistently.
                    </p>

                    <h2>Performance</h2>
                    <p>
                        React provides several ways to optimize your application's performance and
                        ensure smooth user experiences.
                    </p>

                    <h3>React.memo</h3>
                    <p>
                        React.memo is a higher order component that memoizes the result of a
                        component. It only re-renders if its props change.
                    </p>

                    <h3>useMemo</h3>
                    <p>
                        useMemo is a React Hook that lets you cache the result of a calculation
                        between re-renders.
                    </p>

                    <h3>useCallback</h3>
                    <p>
                        useCallback is a React Hook that lets you cache a function definition
                        between re-renders.
                    </p>

                    <h2>Testing</h2>
                    <p>
                        Testing is an important part of React development. It helps ensure your
                        components work as expected.
                    </p>

                    <h3>Unit Testing</h3>
                    <p>
                        Unit testing involves testing individual components in isolation to ensure
                        they work correctly.
                    </p>

                    <h3>Integration Testing</h3>
                    <p>
                        Integration testing involves testing how different components work together
                        as a system.
                    </p>
                </main>
            </div>
            <div style={{ width: '300px', position: 'sticky', top: '2rem', height: 'fit-content' }}>
                <TableOfContent contentSelector={contentSelector} />
            </div>
        </div>
    );
};

export const SimpleNestedStructure: Story = {
    render: () => <SimpleContentWrapper contentSelector="#story-content" />,
    args: {
        contentSelector: '#story-content',
    },
    name: 'Simple Nested Structure',
    parameters: {
        docs: {
            description: {
                story: 'A table of contents component displaying a simplified nested heading structure with 3 levels (h1-h3). The component automatically detects headings within the specified content selector and creates a navigable table of contents with proper indentation for each heading level.',
            },
        },
    },
};
