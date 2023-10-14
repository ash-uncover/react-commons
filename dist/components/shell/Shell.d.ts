import React, { ReactNode } from 'react';
import './Shell.css';
interface ShellProperties {
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}
export declare const Shell: ({ className, style, children }: ShellProperties) => React.JSX.Element;
export {};
