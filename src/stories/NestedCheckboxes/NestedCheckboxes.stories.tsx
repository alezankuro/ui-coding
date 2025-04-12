import type { Meta, StoryObj } from '@storybook/react';

import { Checkboxes } from 'src/components/NestedCheckboxes';
import defaultCheckboxesData from 'src/mock-data/nested-checkboxes/checkboxes-data.json';

const meta = {
    title: 'Components/NestedCheckboxes',
    component: Checkboxes,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Checkboxes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        items: defaultCheckboxesData,
    },
    name: 'Default Checkboxes',
    parameters: {
        docs: {
            description: {
                story: 'Default nested checkboxes with all items unchecked initially.',
            },
        },
    },
};

// Create a copy of the data with some items checked
const partiallyCheckedData = JSON.parse(JSON.stringify(defaultCheckboxesData));
// Check "Mobile phones" and its children
partiallyCheckedData[0].children[0].checked = true;
partiallyCheckedData[0].children[0].children[0].checked = true;
partiallyCheckedData[0].children[0].children[1].checked = true;
// This will make "Electronics" indeterminate
partiallyCheckedData[0].checked = 'indeterminate';

export const PartiallyChecked: Story = {
    args: {
        items: partiallyCheckedData,
    },
    name: 'Partially Checked',
    parameters: {
        docs: {
            description: {
                story: 'Nested checkboxes with some items checked, demonstrating the indeterminate state of parent checkboxes.',
            },
        },
    },
};

// Create a copy of the data with all electronics checked
const allElectronicsCheckedData = JSON.parse(JSON.stringify(defaultCheckboxesData));
// Check "Electronics" and all its children
allElectronicsCheckedData[0].checked = true;
allElectronicsCheckedData[0].children[0].checked = true;
allElectronicsCheckedData[0].children[0].children[0].checked = true;
allElectronicsCheckedData[0].children[0].children[1].checked = true;
allElectronicsCheckedData[0].children[1].checked = true;
allElectronicsCheckedData[0].children[1].children[0].checked = true;
allElectronicsCheckedData[0].children[1].children[1].checked = true;

export const CategoryChecked: Story = {
    args: {
        items: allElectronicsCheckedData,
    },
    name: 'Category Checked',
    parameters: {
        docs: {
            description: {
                story: 'Nested checkboxes with an entire category (Electronics) checked, showing how parent selection affects all children.',
            },
        },
    },
};

// Create a copy of the data with all items checked
const allCheckedData = JSON.parse(JSON.stringify(defaultCheckboxesData));
// Check all items
const checkAllItems = (items: typeof defaultCheckboxesData) => {
    items.forEach((item) => {
        item.checked = true;
        if (item.children) {
            checkAllItems(item.children);
        }
    });
};
checkAllItems(allCheckedData);

export const AllChecked: Story = {
    args: {
        items: allCheckedData,
    },
    name: 'All Checked',
    parameters: {
        docs: {
            description: {
                story: 'Nested checkboxes with all items checked initially.',
            },
        },
    },
};

// Create a simplified data structure with fewer items
const simplifiedData = [
    {
        id: 1,
        name: 'Fruits',
        checked: false,
        children: [
            {
                id: 2,
                name: 'Apples',
                checked: false,
            },
            {
                id: 3,
                name: 'Bananas',
                checked: false,
            },
            {
                id: 4,
                name: 'Oranges',
                checked: false,
            },
        ],
    },
    {
        id: 5,
        name: 'Vegetables',
        checked: false,
        children: [
            {
                id: 6,
                name: 'Carrots',
                checked: false,
            },
            {
                id: 7,
                name: 'Broccoli',
                checked: false,
            },
        ],
    },
];

export const SimpleExample: Story = {
    args: {
        items: simplifiedData,
    },
    name: 'Simple Example',
    parameters: {
        docs: {
            description: {
                story: 'A simpler example with fewer nested items for basic demonstration.',
            },
        },
    },
};
