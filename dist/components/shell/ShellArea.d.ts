import React, { ReactNode } from 'react';
import './ShellArea.css';
interface ShellAreaProperties {
    className?: string;
    style?: React.CSSProperties;
    children: ReactNode;
}
export declare const ShellArea: ({ className, style, children }: ShellAreaProperties) => React.JSX.Element;
export {};
