import { ColumnDefinition, DataTable, numSort, stringSort } from './components/DataTable';
import houses from './mock-data/data-table/houses.json';
import users from './mock-data/data-table/users.json';

import './App.css';

type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

const userColumns: ColumnDefinition<User>[] = [
    {
        label: 'ID',
        key: 'id',
        cell: (data) => data.id,
        sort: (a, b) => numSort(a.id, b.id),
    },
    {
        label: 'Name',
        key: 'name',
        cell: (data) => data.name,
        sort: (a, b) => stringSort(a.name, b.name),
        filter: 'text',
    },
    {
        label: 'Age',
        key: 'age',
        cell: (data) => data.age,
        sort: (a, b) => numSort(a.age, b.age),
        filter: 'range',
    },
    {
        label: 'Occupation',
        key: 'occupation',
        cell: (data) => data.occupation,
        sort: (a, b) => stringSort(a.occupation, b.occupation),
        filter: 'text',
    },
] as const;

type House = {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
    built_year: number;
};

const housesColumns: ColumnDefinition<House>[] = [
    {
        label: 'ID',
        key: 'id',
        cell: (data) => data.id,
        sort: (a, b) => numSort(a.id, b.id),
    },
    {
        label: 'Street',
        key: 'street',
        cell: (data) => data.street,
        sort: (a, b) => stringSort(a.street, b.street),
    },
    {
        label: 'City',
        key: 'city',
        cell: (data) => data.city,
        sort: (a, b) => stringSort(a.city, b.city),
    },
    {
        label: 'State',
        key: 'state',
        cell: (data) => data.state,
        sort: (a, b) => stringSort(a.state, b.state),
    },
    {
        label: 'Built Year',
        key: 'built_year',
        cell: (data) => data.built_year,
        sort: (a, b) => numSort(a.built_year, b.built_year),
    },
] as const;

function App() {
    return (
        <div>
            <h1>Users</h1>
            <DataTable data={users as User[]} columns={userColumns} />
            <h1>Houses</h1>
            <DataTable data={houses as House[]} columns={housesColumns} />
        </div>
    );
}

export default App;
