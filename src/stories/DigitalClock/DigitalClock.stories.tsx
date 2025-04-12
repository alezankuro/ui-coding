import type { Meta, StoryObj } from '@storybook/react';

import { CurrentTimeDigitalClock, DigitalClock } from 'src/components/DigitalClock';

import './DigitalClock.stories.css';

const meta = {
    title: 'Components/DigitalClock',
    component: DigitalClock,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof DigitalClock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        time: new Date('2023-01-01T12:34:56'),
    },
    name: 'Default Digital Clock',
    parameters: {
        docs: {
            description: {
                story: 'A basic digital clock displaying a static time (12:34:56).',
            },
        },
    },
};

export const MorningTime: Story = {
    args: {
        time: new Date('2023-01-01T08:30:00'),
    },
    name: 'Morning Time',
    parameters: {
        docs: {
            description: {
                story: 'A digital clock displaying a morning time (8:30:00).',
            },
        },
    },
};

export const EveningTime: Story = {
    args: {
        time: new Date('2023-01-01T20:15:45'),
    },
    name: 'Evening Time',
    parameters: {
        docs: {
            description: {
                story: 'A digital clock displaying an evening time (20:15:45).',
            },
        },
    },
};

export const Midnight: Story = {
    args: {
        time: new Date('2023-01-01T00:00:00'),
    },
    name: 'Midnight',
    parameters: {
        docs: {
            description: {
                story: 'A digital clock displaying midnight (00:00:00).',
            },
        },
    },
};

const CurrentTimeWrapper = () => {
    return <CurrentTimeDigitalClock />;
};

export const LiveClock: Story = {
    render: () => <CurrentTimeWrapper />,
    args: {
        time: new Date(),
    },
    name: 'Live Digital Clock',
    parameters: {
        docs: {
            description: {
                story: 'A digital clock that displays the current time and updates every second.',
            },
        },
    },
};

export const CustomStyledClock: Story = {
    args: {
        time: new Date('2023-01-01T15:45:30'),
    },
    name: 'Custom Styled Clock',
    decorators: [
        (Story) => (
            <div className="blue-clock">
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A digital clock with custom styling (light blue color).',
            },
        },
    },
};

export const LargeRedClock: Story = {
    args: {
        time: new Date('2023-01-01T10:20:30'),
    },
    name: 'Large Red Clock',
    decorators: [
        (Story) => (
            <div className="red-clock">
                <Story />
            </div>
        ),
    ],
    parameters: {
        docs: {
            description: {
                story: 'A large digital clock with red segments on a dark background.',
            },
        },
    },
};
