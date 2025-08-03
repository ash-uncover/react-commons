import React from 'react';
import './ShellContainer.css';
export interface ShellContainerProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    level?: number;
}
export declare const ShellContainer: ({ className, level, style, children }: ShellContainerProperties) => React.JSX.Element;
export declare function computeContainerLevel(element: HTMLElement): number;
export declare function validContainerLevel(level: number): number;
export declare function getParentContainer(element: HTMLElement): HTMLElement | null;
