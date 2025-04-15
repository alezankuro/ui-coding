import CarouselControls from './components/CarouselControls.component';
import CarouselNavigation from './components/CarouselNavigation.component';
import { type Image } from './ImageCarousel.constants';
import { useAutoNavigate, useCarouselNav } from './ImageCarousel.hooks';
import { classNames, getImgTransitionClasses } from './ImageCarousel.utils';

import './ImageCarousel.styles.css';

type ImageCarouselProps = {
    images: ReadonlyArray<Image>;
    autoPlayTime?: number | null;
};

export function ImageCarousel({ images, autoPlayTime }: ImageCarouselProps) {
    const { current, next, isTransitioning, goNext, goPrev, goToIndex, onTransitionEnd } =
        useCarouselNav(0, images.length);

    useAutoNavigate(current, goNext, autoPlayTime);

    const currentImg = images[current];
    const nextImg = next !== null ? images[next] : null;

    const { currentClass, nextClass } = getImgTransitionClasses(next, current, images.length);

    return (
        <div className="image-carousel">
            <div className="image-carousel__images-container">
                <img
                    key={currentImg.src}
                    alt={currentImg.alt}
                    src={currentImg.src}
                    className={classNames({ [currentClass]: isTransitioning })}
                />
                {nextImg && (
                    <img
                        key={nextImg.src}
                        alt={nextImg.alt}
                        src={nextImg.src}
                        className={classNames({ [nextClass]: !isTransitioning })}
                        onTransitionEnd={onTransitionEnd}
                    />
                )}
            </div>
            <CarouselControls onLeft={goPrev} onRight={goNext} disabled={isTransitioning} />
            <CarouselNavigation
                current={current}
                next={next}
                total={images.length}
                onChange={goToIndex}
                disabled={isTransitioning}
                isTransitioning={isTransitioning}
            />
        </div>
    );
}

export default ImageCarousel;
