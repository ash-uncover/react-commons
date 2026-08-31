import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './AppMenuItem.css';
export interface AppMenuItemProperties {
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    depth?: number;
    description?: string;
    group?: boolean;
    icon?: IconProp;
    name?: string;
    onClick: () => void;
}
export declare const AppMenuItem: ({ className, active, depth, description, group, icon, name, onClick, }: AppMenuItemProperties) => React.JSX.Element;
