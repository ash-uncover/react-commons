import React from 'react';
import './App.css';
export interface AppProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare const App: ({ className, style, children }: AppProperties) => React.JSX.Element;
