import React from 'react';
import { IMenu } from './MenuUtil';
import './Menu.css';
export interface MenuProperties {
    className?: string;
    collapsed?: boolean;
    menu: IMenu;
    onMenuToggle?: () => void;
}
export declare const Menu: ({ className, collapsed, menu, onMenuToggle }: MenuProperties) => React.JSX.Element;
