import type { Meta, StoryObj } from '@storybook/react';

import { ColumnDefinition, DataTable, numSort, stringSort } from '../../components/DataTable';
import houses from '../../mock-data/data-table/houses.json';
import users from '../../mock-data/data-table/users.json';

// Define types for our data
type User = {
    id: number;
    name: string;
    age: number;
    occupation: string;
};

type House = {
    id: number;
    street: string;
    city: string;
    state: string;
    zip: string;
    built_year: number;
};

// Define column configurations
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

// Create a meta object for the DataTable component
const meta = {
    title: 'Components/DataTable',
    component: DataTable,
    parameters: {
        layout: 'padded',
    },
} satisfies Meta<typeof DataTable>;

export default meta;
// We need to use a more specific type for our stories to handle the generic DataTable component
type Story<T> = StoryObj<{
    args: {
        data: T[];
        columns: ColumnDefinition<T>[];
    };
}>;

// Stories
export const WithUsers: Story<User> = {
    args: {
        data: users as User[],
        columns: userColumns,
    },
    name: 'Users Table',
    parameters: {
        docs: {
            description: {
                story: 'A DataTable displaying user information with text and range filtering capabilities.',
            },
        },
    },
};

export const WithHouses: Story<House> = {
    args: {
        data: houses as House[],
        columns: housesColumns,
    },
    name: 'Houses Table',
    parameters: {
        docs: {
            description: {
                story: 'A DataTable displaying house information with basic sorting functionality.',
            },
        },
    },
};

// Create a story with a subset of users for a more focused example
export const FilterableUserTable: Story<User> = {
    args: {
        data: users.slice(0, 10) as User[],
        columns: userColumns,
    },
    name: 'Filterable User Table (Subset)',
    parameters: {
        docs: {
            description: {
                story: 'A smaller DataTable with a subset of users, demonstrating filtering capabilities. Try filtering by name or age range.',
            },
        },
    },
};

// Create a story with custom columns that all have filters
export const FullyFilterableHouseTable: Story<House> = {
    args: {
        data: houses as House[],
        columns: [
            {
                label: 'ID',
                key: 'id',
                cell: (data) => data.id,
                sort: (a, b) => numSort(a.id, b.id),
                filter: 'range',
            },
            {
                label: 'Street',
                key: 'street',
                cell: (data) => data.street,
                sort: (a, b) => stringSort(a.street, b.street),
                filter: 'text',
            },
            {
                label: 'City',
                key: 'city',
                cell: (data) => data.city,
                sort: (a, b) => stringSort(a.city, b.city),
                filter: 'text',
            },
            {
                label: 'State',
                key: 'state',
                cell: (data) => data.state,
                sort: (a, b) => stringSort(a.state, b.state),
                filter: 'text',
            },
            {
                label: 'Built Year',
                key: 'built_year',
                cell: (data) => data.built_year,
                sort: (a, b) => numSort(a.built_year, b.built_year),
                filter: 'range',
            },
        ] as ColumnDefinition<House>[],
    },
    name: 'Fully Filterable House Table',
    parameters: {
        docs: {
            description: {
                story: 'A DataTable with filters on all columns, demonstrating the full filtering capabilities.',
            },
        },
    },
};

// Create a story with custom styling
export const CustomStyledTable: Story<User> = {
    args: {
        data: users as User[],
        columns: userColumns.map((col) => ({
            ...col,
            cell:
                col.key === 'occupation'
                    ? (data: User) => (
                          <span
                              style={{
                                  backgroundColor: '#e6f7ff',
                                  padding: '2px 6px',
                                  borderRadius: '4px',
                                  fontWeight: 'bold',
                              }}
                          >
                              {data.occupation}
                          </span>
                      )
                    : col.cell,
        })),
    },
    name: 'Custom Styled Table',
    parameters: {
        docs: {
            description: {
                story: 'A DataTable with custom styled cells, demonstrating how to customize the appearance of specific columns.',
            },
        },
    },
};
