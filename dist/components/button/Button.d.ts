import React, { ReactNode } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ButtonSemantic } from './ButtonSemantic';
import './Button.css';
export interface ButtonProperties {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    icon?: IconProp;
    iconEnd?: IconProp;
    semantic?: ButtonSemantic;
    text?: string;
    title?: string;
    type?: 'button' | 'submit';
    onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
    children?: ReactNode;
}
export declare const Button: ({ className, style, disabled, icon, iconEnd, semantic, text, title, type, onClick, children, }: ButtonProperties) => React.JSX.Element;
