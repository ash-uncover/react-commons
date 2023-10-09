import React, { ReactNode } from 'react';
import './ShellMenu.css';
interface ShellMenuProperties {
    className?: string;
    style?: React.CSSProperties;
    expanded?: boolean;
    title?: string;
    children?: ReactNode;
}
export declare const ShellMenu: ({ className, style, expanded, title, children, }: ShellMenuProperties) => React.JSX.Element;
export {};
