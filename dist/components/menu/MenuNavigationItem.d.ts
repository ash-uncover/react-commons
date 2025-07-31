import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './MenuNavigationItem.css';
export interface MenuNavigationItemProperties {
    className?: string;
    name?: string;
    description?: string;
    icon?: IconProp;
    selected?: boolean;
    onClick: () => void;
}
export declare const MenuNavigationItem: ({ className, name, description, icon, selected, onClick }: MenuNavigationItemProperties) => React.JSX.Element;
