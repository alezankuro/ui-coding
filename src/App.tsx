import { useState } from 'react';

import Tabs from './components/Tabs/Tabs.component';

import './App.css';

function App() {
    const [activeTabValue, setActiveTabValue] = useState('html');

    return (
        <Tabs value={activeTabValue} onChange={setActiveTabValue}>
            <Tabs.List>
                <Tabs.Tab value="html">HTML</Tabs.Tab>
                <Tabs.Tab value="css">CSS</Tabs.Tab>
                <Tabs.Tab value="js">JavaScript</Tabs.Tab>
            </Tabs.List>
            <Tabs.Content>
                <Tabs.Panel value="html">
                    <p>
                        The HyperText Markup Language or HTML is the standard markup language for
                        documents designed to be displayed in a web browser.
                    </p>
                </Tabs.Panel>
                <Tabs.Panel value="css">
                    <p>
                        Cascading Style Sheets is a style sheet language used for describing the
                        presentation of a document written in a markup language such as HTML or XML.
                    </p>
                </Tabs.Panel>
                <Tabs.Panel value="js">
                    <p>
                        JavaScript, often abbreviated as JS, is a programming language that is one
                        of the core technologies of the World Wide Web, alongside HTML and CSS.
                    </p>
                </Tabs.Panel>
            </Tabs.Content>
        </Tabs>
    );
}

export default App;
