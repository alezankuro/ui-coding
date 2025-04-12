import { Checkboxes } from 'src/components/NestedCheckboxes';
import checkboxesData from 'src/mock-data/nested-checkboxes/checkboxes-data.json';

import './App.css';

function App() {
    return (
        <div>
            <Checkboxes items={checkboxesData} />
        </div>
    );
}

export default App;
