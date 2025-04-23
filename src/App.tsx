import { useState } from 'react';

import { CrushMoleGame, CrushMoleGameSerivce } from './components/CrushMoleGame';

import './App.css';

function App() {
    const [game, setGame] = useState(new CrushMoleGameSerivce(5));
    const [isGameOn, setGameOn] = useState(false);

    function onStartStop() {
        if (isGameOn) {
            setGame(game.stopGame());
            setGameOn(false);
        } else {
            setGame(game.startGame());
            setGameOn(true);
        }
    }

    return (
        <div>
            <CrushMoleGame game={game} />
            <button onClick={onStartStop}>{isGameOn ? 'Stop' : 'Start'}</button>
        </div>
    );
}

export default App;
