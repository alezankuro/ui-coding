/// <reference types="vite/client" />

declare namespace React {
    interface DialogHTMLAttributes<T> extends HTMLAttributes<T> {
        closedby?: 'any' | 'closerequest' | 'none';
    }
}
