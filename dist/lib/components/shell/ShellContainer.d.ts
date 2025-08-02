import React from 'react';
import './ShellContainer.css';
export interface ShellContainerProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    root?: boolean;
}
export declare const ShellContainer: ({ className, root, style, children }: ShellContainerProperties) => React.JSX.Element;
export declare function computeContainerLevel(element: HTMLElement): number;
export declare function getParentContainer(element: HTMLElement): HTMLElement | null;
