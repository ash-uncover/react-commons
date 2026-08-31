import React from 'react';
import { AppNode } from './AppNode';
import './AppMenu.css';
export interface AppMenuProperties {
    className?: string;
    style?: React.CSSProperties;
    node: AppNode;
}
export declare const AppMenu: ({ className, style, node, }: AppMenuProperties) => React.JSX.Element | null;
