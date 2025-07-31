import React from 'react';
import './PanelHeader.css';
interface PanelHeaderProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare const PanelHeader: ({ className, style, children, }: PanelHeaderProperties) => React.JSX.Element;
export {};
