import { TicTacToe } from './components/TicTacToe';

import './App.css';

function App() {
    return (
        <div className="container">
            <TicTacToe boardSize={3} winCondition={3} />
        </div>
    );
}

export default App;
