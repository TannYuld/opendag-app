export {};

declare global {
    interface HTMLElement {
        show(): void;
        hide(): void;
    }
}