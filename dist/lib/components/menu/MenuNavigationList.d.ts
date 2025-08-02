import React from 'react';
import { MenuNavigationItemProperties } from './MenuNavigationItem';
import './MenuNavigationList.css';
export interface MenuNavigationListProperties {
    className?: string;
    items: MenuNavigationItemProperties[];
}
export declare const MenuNavigationList: ({ className, items }: MenuNavigationListProperties) => React.JSX.Element;
