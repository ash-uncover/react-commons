import React, { ReactNode } from 'react';
import './ShellMainArea.css';
interface ShellMainAreaProperties {
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    children?: ReactNode;
}
export declare const ShellMainArea: ({ className, style, title, children, }: ShellMainAreaProperties) => React.JSX.Element;
export {};
