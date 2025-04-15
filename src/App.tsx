import images from 'src/mock-data/image-carousel/images.json';

import { ImageCarousel } from './components/ImageCarousel';

import './App.css';

function App() {
    return (
        <div>
            <ImageCarousel images={images} />
        </div>
    );
}

export default App;
