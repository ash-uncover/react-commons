import React from 'react';
import './ShellPage.css';
export interface ShellPageProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    level?: number;
}
export declare const ShellPage: ({ className, style, level, children }: ShellPageProperties) => React.JSX.Element;
