import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Tabs from 'src/components/Tabs/Tabs.component';

const meta = {
    title: 'Components/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component to handle state for the tabs
const TabsWrapper = ({
    initialTab = 'tab1',
    children,
}: {
    initialTab?: string;
    children: React.ReactNode;
}) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    return (
        <Tabs value={activeTab} onChange={setActiveTab}>
            {children}
        </Tabs>
    );
};

export const Default: Story = {
    args: {
        value: 'tab1',
        onChange: () => {},
        children: null,
    },
    render: () => (
        <TabsWrapper>
            <Tabs.List>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
            </Tabs.List>
            <Tabs.Content>
                <Tabs.Panel value="tab1">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>Tab 1 Content</h3>
                        <p>This is the content for Tab 1.</p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="tab2">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>Tab 2 Content</h3>
                        <p>This is the content for Tab 2.</p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="tab3">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>Tab 3 Content</h3>
                        <p>This is the content for Tab 3.</p>
                    </div>
                </Tabs.Panel>
            </Tabs.Content>
        </TabsWrapper>
    ),
    name: 'Default Tabs',
    parameters: {
        docs: {
            description: {
                story: 'Basic tabs with three panels.',
            },
        },
    },
};

export const ProgrammingLanguages: Story = {
    args: {
        value: 'html',
        onChange: () => {},
        children: null,
    },
    render: () => (
        <TabsWrapper initialTab="html">
            <Tabs.List>
                <Tabs.Tab value="html">HTML</Tabs.Tab>
                <Tabs.Tab value="css">CSS</Tabs.Tab>
                <Tabs.Tab value="js">JavaScript</Tabs.Tab>
            </Tabs.List>
            <Tabs.Content>
                <Tabs.Panel value="html">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>HTML</h3>
                        <p>
                            The HyperText Markup Language or HTML is the standard markup language
                            for documents designed to be displayed in a web browser.
                        </p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="css">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>CSS</h3>
                        <p>
                            Cascading Style Sheets is a style sheet language used for describing the
                            presentation of a document written in a markup language such as HTML or
                            XML.
                        </p>
                    </div>
                </Tabs.Panel>
                <Tabs.Panel value="js">
                    <div style={{ padding: '20px', marginTop: '10px' }}>
                        <h3>JavaScript</h3>
                        <p>
                            JavaScript, often abbreviated as JS, is a programming language that is
                            one of the core technologies of the World Wide Web, alongside HTML and
                            CSS.
                        </p>
                    </div>
                </Tabs.Panel>
            </Tabs.Content>
        </TabsWrapper>
    ),
    name: 'Programming Languages',
    parameters: {
        docs: {
            description: {
                story: 'Tabs showing information about different programming languages.',
            },
        },
    },
};

export const ManyTabs: Story = {
    args: {
        value: 'tab1',
        onChange: () => {},
        children: null,
    },
    render: () => (
        <TabsWrapper initialTab="tab1">
            <Tabs.List>
                <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
                <Tabs.Tab value="tab2">Tab 2</Tabs.Tab>
                <Tabs.Tab value="tab3">Tab 3</Tabs.Tab>
                <Tabs.Tab value="tab4">Tab 4</Tabs.Tab>
                <Tabs.Tab value="tab5">Tab 5</Tabs.Tab>
                <Tabs.Tab value="tab6">Tab 6</Tabs.Tab>
            </Tabs.List>
            <Tabs.Content>
                {Array.from({ length: 6 }, (_, i) => i + 1).map((num) => (
                    <Tabs.Panel key={`tab${num}`} value={`tab${num}`}>
                        <div style={{ padding: '20px', marginTop: '10px' }}>
                            <h3>Tab {num} Content</h3>
                            <p>This is the content for Tab {num}.</p>
                        </div>
                    </Tabs.Panel>
                ))}
            </Tabs.Content>
        </TabsWrapper>
    ),
    name: 'Many Tabs',
    parameters: {
        docs: {
            description: {
                story: 'Example with many tabs to demonstrate keyboard navigation.',
            },
        },
    },
};

export const CustomStyling: Story = {
    args: {
        value: 'tab1',
        onChange: () => {},
        children: null,
    },
    render: () => (
        <div
            style={
                {
                    '--active-color': 'rgb(220, 53, 69)',
                    padding: '20px',
                    background: '#f8f9fa',
                    borderRadius: '8px',
                } as React.CSSProperties
            }
        >
            <TabsWrapper initialTab="tab1">
                <Tabs.List>
                    <Tabs.Tab value="tab1">Home</Tabs.Tab>
                    <Tabs.Tab value="tab2">Profile</Tabs.Tab>
                    <Tabs.Tab value="tab3">Settings</Tabs.Tab>
                </Tabs.List>
                <Tabs.Content>
                    <Tabs.Panel value="tab1">
                        <div style={{ padding: '20px', marginTop: '10px' }}>
                            <h3>Home</h3>
                            <p>Welcome to the home page!</p>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab2">
                        <div style={{ padding: '20px', marginTop: '10px' }}>
                            <h3>Profile</h3>
                            <p>This is your profile page.</p>
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="tab3">
                        <div style={{ padding: '20px', marginTop: '10px' }}>
                            <h3>Settings</h3>
                            <p>Adjust your settings here.</p>
                        </div>
                    </Tabs.Panel>
                </Tabs.Content>
            </TabsWrapper>
        </div>
    ),
    name: 'Custom Styling',
    parameters: {
        docs: {
            description: {
                story: 'Tabs with custom styling using CSS variables.',
            },
        },
    },
};
