import React, { ReactNode } from 'react';
import { TitleLevel } from '../..';
import './Panel.css';
interface PanelProperties {
    className?: string;
    style?: React.CSSProperties;
    expandable?: boolean;
    expanded?: boolean;
    title: string;
    titleLevel?: TitleLevel;
    children?: ReactNode;
}
export declare const Panel: ({ className, style, expandable, expanded, title, titleLevel, children, }: PanelProperties) => React.JSX.Element;
export {};
