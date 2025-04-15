import type { Meta } from '@storybook/react';

import { ImageCarousel } from '../../components/ImageCarousel';
import defaultImages from '../../mock-data/image-carousel/images.json';

const meta = {
    title: 'Components/ImageCarousel',
    component: ImageCarousel,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof ImageCarousel>;

export default meta;

export const Basic = {
    args: {
        images: defaultImages,
    },
    name: 'Basic Carousel',
    parameters: {
        docs: {
            description: {
                story: 'A basic image carousel with default settings and auto-navigation.',
            },
        },
    },
};

const customImages = [
    {
        src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        alt: 'Landscape with mountains and lake',
    },
    {
        src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
        alt: 'Mountain range at sunset',
    },
    {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
        alt: 'Forest with fog',
    },
    {
        src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
        alt: 'Sunlight through forest trees',
    },
];

export const CustomImages = {
    args: {
        images: customImages,
    },
    name: 'Custom Images',
    parameters: {
        docs: {
            description: {
                story: 'An image carousel with custom landscape images.',
            },
        },
    },
};

const CustomStyledCarousel = () => (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', borderRadius: '10px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
            Custom Styled Carousel
        </h2>
        <div
            style={{
                border: '5px solid #333',
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
            }}
        >
            <ImageCarousel images={defaultImages} />
        </div>
        <p style={{ textAlign: 'center', marginTop: '15px', color: '#666' }}>
            Navigate through beautiful images
        </p>
    </div>
);

export const CustomStyling = {
    render: () => <CustomStyledCarousel />,
    name: 'Custom Styling',
    parameters: {
        docs: {
            description: {
                story: 'An image carousel with custom container styling and additional elements.',
            },
        },
    },
};

const natureImages = [
    {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e',
        alt: 'Sunset over lake',
    },
    {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
        alt: 'Mountain valley',
    },
    {
        src: 'https://images.unsplash.com/photo-1426604966848-d7adac402bff',
        alt: 'Forest path',
    },
    {
        src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d',
        alt: 'Forest in autumn',
    },
];

export const NatureGallery = {
    args: {
        images: natureImages,
    },
    name: 'Nature Gallery',
    parameters: {
        docs: {
            description: {
                story: 'An image carousel featuring nature photography.',
            },
        },
    },
};

const cityImages = [
    {
        src: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
        alt: 'City skyline',
    },
    {
        src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
        alt: 'New York at night',
    },
    {
        src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000',
        alt: 'City street',
    },
    {
        src: 'https://images.unsplash.com/photo-1444723121867-7a241cacace9',
        alt: 'London Bridge',
    },
];

export const CityScapes = {
    args: {
        images: cityImages,
    },
    name: 'City Scapes',
    parameters: {
        docs: {
            description: {
                story: 'An image carousel featuring urban photography.',
            },
        },
    },
};

export const CustomAutoPlayTiming = {
    args: {
        images: defaultImages,
        autoPlayTime: 3000,
    },
    name: 'Custom Auto-Play Timing',
    parameters: {
        docs: {
            description: {
                story: 'An image carousel with custom auto-navigation timing (1 second intervals).',
            },
        },
    },
};
