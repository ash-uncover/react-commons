import React from 'react';
import './Shell.css';
export interface ShellProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare const Shell: ({ className, style, children }: ShellProperties) => React.JSX.Element;
