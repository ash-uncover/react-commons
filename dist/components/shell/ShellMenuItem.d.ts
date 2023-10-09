import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './ShellMenuItem.css';
interface ShellMenuItemProperties {
    className?: string;
    style?: React.CSSProperties;
    expanded?: boolean;
    icon?: IconProp;
    selected?: boolean;
    text: string;
    to: string;
}
export declare const ShellMenuItem: ({ className, style, expanded, icon, selected, text, to, }: ShellMenuItemProperties) => React.JSX.Element;
export {};
