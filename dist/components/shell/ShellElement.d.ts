import React, { ReactNode } from 'react';
import './ShellElement.css';
interface ShellElementProperties {
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}
export declare const ShellElement: ({ className, style, children }: ShellElementProperties) => React.JSX.Element;
export {};
