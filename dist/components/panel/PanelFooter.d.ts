import React, { ReactNode } from 'react';
import './PanelFooter.css';
interface PanelFooterProperties {
    className?: string;
    style?: React.CSSProperties;
    children?: ReactNode;
}
export declare const PanelFooter: ({ className, style, children, }: PanelFooterProperties) => React.JSX.Element;
export {};
