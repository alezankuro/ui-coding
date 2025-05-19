import { TicTacToe } from './components/TicTacToe';

import './App.css';

function App() {
    return (
        <div className="container">
            <TicTacToe boardSize={6} />;
        </div>
    );
}

export default App;
