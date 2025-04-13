import { GridWithSelection } from './components/GridWithSelection';

import './App.css';

function App() {
    return (
        <div style={{ width: '200px' }}>
            <GridWithSelection size={{ rows: 10, cols: 10 }} />
        </div>
    );
}

export default App;
