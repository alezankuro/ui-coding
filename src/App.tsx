import { TicTacToe } from './components/TicTacToe';

import './App.css';

function App() {
    return (
        <div className="container">
            <TicTacToe boardSize={4} winCondition={3} />;
        </div>
    );
}

export default App;
