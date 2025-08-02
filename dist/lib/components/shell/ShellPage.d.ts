import React from 'react';
import './ShellPage.css';
export interface ShellPageProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare const ShellPage: ({ className, style, children }: ShellPageProperties) => React.JSX.Element;
