import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './MenuNavigationItem.css';
export interface MenuNavigationItemProperties {
    className?: string;
    style?: React.CSSProperties;
    container?: boolean;
    description?: string;
    icon?: IconProp;
    name?: string;
    selected?: boolean;
    onClick: () => void;
}
export declare const MenuNavigationItem: ({ className, container, description, icon, name, selected, onClick }: MenuNavigationItemProperties) => React.JSX.Element;
