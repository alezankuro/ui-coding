import { ComponentPropsWithRef, useRef } from 'react';

import TableOfContent from './components/TableOfContent/TableOfContent.component';

import './App.css';

function Content({ ref }: ComponentPropsWithRef<'main'>) {
    return (
        <main ref={ref}>
            <h1>Lorem ipsum dolor sit amet</h1>
            <section>
                <h2>1. Lorem ipsum dolor sit amet</h2>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <h2>1.1. Lorem ipsum dolor sit amet</h2>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
            </section>
            <section>
                <h2>2. Lorem ipsum dolor sit amet</h2>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                    <article>
                        <h4>Lorem ipsum dolor sit.</h4>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem.
                        Maxime cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste
                        adipisci! Eos, ratione cumque unde rerum provident culpa nesciunt eaque
                        deserunt.
                    </article>
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
            </section>
            <section>
                <h2>3. Lorem ipsum dolor sit amet</h2>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
                <article>
                    <h3>Lorem ipsum dolor sit.</h3>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla, quidem. Maxime
                    cumque aliquam recusandae ratione quaerat repudiandae. Nisi, iste adipisci! Eos,
                    ratione cumque unde rerum provident culpa nesciunt eaque deserunt.
                </article>
            </section>
        </main>
    );
}

function App() {
    const contentRef = useRef(null);

    return (
        <div className="container">
            <Content ref={contentRef} />
            <TableOfContent contentSelector="main" />
        </div>
    );
}

export default App;
