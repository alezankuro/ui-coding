type CarouselNavigattionProps = {
    current: number;
    next: number | null;
    total: number;
    onChange(index: number): void;
    isTransitioning: boolean;
    disabled?: boolean;
};

export function CarouselNavigation({
    current,
    next,
    total,
    onChange,
    disabled,
    isTransitioning,
}: CarouselNavigattionProps) {
    return (
        <div className="image-carousel__nav">
            {Array.from({ length: total }).map((_, index) => (
                <input
                    type="radio"
                    className="image-carousel__nav__item"
                    key={Math.random()}
                    onChange={() => onChange(index)}
                    checked={isTransitioning ? next === index : current === index}
                    aria-label={`Navigate to image ${index}`}
                    disabled={disabled}
                />
            ))}
        </div>
    );
}

export default CarouselNavigation;
