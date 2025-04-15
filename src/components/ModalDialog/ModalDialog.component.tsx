import { useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import {
    useFocusOnFirstTabbableElement,
    useFocusTrap,
    useKeydown,
    useOutsideClick,
    useReturnFocus,
} from './ModalDialog.hooks';

import './ModalDialog.styles.css';

type ModalDialogProps = Readonly<{
    open: boolean;
    children: React.ReactNode;
    title: string;
    onClose: () => void;
}>;

export default function ModalDialog({ open, ...props }: ModalDialogProps) {
    if (!open) return null;

    return <ModalDialogComponent open={open} {...props} />;
}

export function ModalDialogComponent({ open = false, children, title, onClose }: ModalDialogProps) {
    const titleId = useId();
    const contentId = useId();
    const modalRef = useRef(null);

    useKeydown('Escape', onClose);
    useOutsideClick(modalRef, onClose);

    useReturnFocus();
    useFocusOnFirstTabbableElement(modalRef);
    useFocusTrap(modalRef);

    if (!open) return null;

    return createPortal(
        <div className="modal-overlay">
            <div
                aria-describedby={contentId}
                aria-labelledby={titleId}
                className="modal"
                role="dialog"
                ref={modalRef}
            >
                <h1 className="modal-title" id={titleId}>
                    {title}
                </h1>
                <div id={contentId}>{children}</div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>,
        document.body,
    );
}
