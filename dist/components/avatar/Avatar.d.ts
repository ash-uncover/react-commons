import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Avatar.css';
type AvatarSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
export declare const AvatarSizes: {
    XS: AvatarSize;
    S: AvatarSize;
    M: AvatarSize;
    L: AvatarSize;
    XL: AvatarSize;
};
interface AvatarProperties {
    className?: string;
    style?: React.CSSProperties;
    icon?: IconProp;
    image?: string;
    initials?: string;
    size?: AvatarSize;
    title?: string;
    onClick?: (event: React.FormEvent<HTMLDivElement>) => void;
}
export declare const Avatar: ({ className, style, icon, image, initials, size, title, onClick }: AvatarProperties) => React.JSX.Element;
export {};
