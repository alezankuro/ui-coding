import type { Meta, StoryObj } from '@storybook/react';

import { GridWithSelection } from 'src/components/GridWithSelection';

const meta = {
    title: 'Components/GridWithSelection',
    component: GridWithSelection,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof GridWithSelection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        size: { rows: 10, cols: 10 },
    },
    name: 'Default Grid',
    decorators: [
        (Story) => (
            <div style={{ width: '400px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A 10x10 grid with selection capability. Click and drag to select multiple cells.',
            },
        },
    },
};

export const SmallGrid: Story = {
    args: {
        size: { rows: 5, cols: 5 },
    },
    name: 'Small Grid (5x5)',
    decorators: [
        (Story) => (
            <div style={{ width: '250px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A smaller 5x5 grid with selection capability.',
            },
        },
    },
};

export const LargeGrid: Story = {
    args: {
        size: { rows: 15, cols: 15 },
    },
    name: 'Large Grid (15x15)',
    decorators: [
        (Story) => (
            <div style={{ width: '600px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A larger 15x15 grid with selection capability.',
            },
        },
    },
};

export const RectangularGrid: Story = {
    args: {
        size: { rows: 8, cols: 12 },
    },
    name: 'Rectangular Grid (8x12)',
    decorators: [
        (Story) => (
            <div style={{ width: '500px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A rectangular grid with 8 rows and 12 columns.',
            },
        },
    },
};

export const CustomStyledGrid: Story = {
    args: {
        size: { rows: 10, cols: 10 },
    },
    name: 'Custom Styled Grid',
    decorators: [
        (Story) => (
            <div
                style={
                    {
                        '--selection-color': 'rgba(255, 99, 71, 0.7)',
                        padding: '20px',
                        backgroundColor: '#f5f5f5',
                        borderRadius: '8px',
                        width: '400px',
                    } as React.CSSProperties
                }
            >
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A grid with custom styling, using a tomato color for selection.',
            },
        },
    },
};

export const ConstrainedSizeGrid: Story = {
    args: {
        size: { rows: 10, cols: 10 },
    },
    name: 'Constrained Size Grid',
    decorators: [
        (Story) => (
            <div style={{ width: '300px', border: '1px solid #ccc', padding: '10px' }}>
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: "A grid constrained to a specific container width, similar to how it's used in App.tsx.",
            },
        },
    },
};
