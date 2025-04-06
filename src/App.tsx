import DataTable from './components/DataTable';
import users from './mock-data/data-table/users.json';

import './App.css';

function App() {
    return (
        <div>
            <DataTable data={users} />
        </div>
    );
}

export default App;
