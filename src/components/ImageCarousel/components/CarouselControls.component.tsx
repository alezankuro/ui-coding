type CarouselControlsProps = {
    onLeft(): void;
    onRight(): void;
    disabled?: boolean;
};

export function CarouselControls({ onLeft, onRight, disabled }: CarouselControlsProps) {
    return (
        <div className="image-carousel__controls">
            <button onClick={onLeft} aria-label="Previous Image" disabled={disabled}>
                &#10094;
            </button>
            <button onClick={onRight} aria-label="Next Image" disabled={disabled}>
                &#10095;
            </button>
        </div>
    );
}

export default CarouselControls;
