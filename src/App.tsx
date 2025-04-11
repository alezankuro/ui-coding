import { CurrentTimeDigitalClock, DigitalClock } from './components/DigitalClock';

import './App.css';

function App() {
    return (
        <div>
            <DigitalClock time={new Date()} />
            <CurrentTimeDigitalClock />
        </div>
    );
}

export default App;
