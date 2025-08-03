import React from 'react';
import { IMenu } from './MenuUtil';
import './Menu.css';
export interface MenuProperties {
    className?: string;
    style?: React.CSSProperties;
    collapsed?: boolean;
    container?: boolean;
    containerLevel?: number;
    menu: IMenu;
    onMenuToggle?: () => void;
}
export declare const Menu: ({ className, style, collapsed, container, containerLevel, menu, onMenuToggle }: MenuProperties) => React.JSX.Element;
