import React from 'react';
import './PanelFooter.css';
interface PanelFooterProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
}
export declare const PanelFooter: ({ className, style, children, }: PanelFooterProperties) => React.JSX.Element;
export {};
