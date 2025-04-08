import { DataTable, TableColumn } from './components/DataTable';
import houses from './mock-data/data-table/houses.json';
import users from './mock-data/data-table/users.json';

import './App.css';

type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

const userColumns: TableColumn<User>[] = [
    { label: 'ID', key: 'id' },
    { label: 'Name', key: 'name' },
    { label: 'Age', key: 'age' },
    { label: 'Occupation', key: 'occupation' },
] as const;

function renderUserRow({ id, name, age, occupation }: User) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{occupation}</td>
        </tr>
    );
}

type House = {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
    built_year: number;
};

const housesColumns: TableColumn<House>[] = [
    { label: 'ID', key: 'id' },
    { label: 'Street', key: 'street' },
    { label: 'City', key: 'city' },
    { label: 'State', key: 'state' },
    { label: 'Built Year', key: 'built_year' },
] as const;

function renderHouseRow({ id, street, city, state, built_year }: House) {
    return (
        <tr key={id}>
            <td>{id}</td>
            <td>{street}</td>
            <td>{city}</td>
            <td>{state}</td>
            <td>{built_year}</td>
        </tr>
    );
}

function App() {
    return (
        <div>
            <h1>Users</h1>
            <DataTable data={users as User[]} columns={userColumns} renderRow={renderUserRow} />
            <h1>Houses</h1>
            <DataTable
                data={houses as House[]}
                columns={housesColumns}
                renderRow={renderHouseRow}
            />
        </div>
    );
}

export default App;
