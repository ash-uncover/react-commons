import React, { ReactNode } from 'react';
import './ShellBackground.css';
interface ShellBackgroundProperties {
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}
export declare const ShellBackground: ({ className, style, children }: ShellBackgroundProperties) => React.JSX.Element;
export {};
