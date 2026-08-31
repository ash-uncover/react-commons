import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export interface IconProperties {
    className?: string;
    style?: React.CSSProperties;
    icon: IconProp;
}
export declare const Icon: ({ className, style, icon, }: IconProperties) => React.JSX.Element;
