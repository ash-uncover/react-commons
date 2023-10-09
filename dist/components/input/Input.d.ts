import React from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './Input.css';
interface InputProperties {
    className?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    autoSelect?: boolean;
    disabled?: boolean;
    icon?: IconProp;
    name?: string;
    placeholder?: string;
    required?: boolean;
    showClearIcon?: boolean;
    showPasswordIcon?: boolean;
    type?: 'password' | 'number' | '';
    value?: string;
    onChange: (event: {
        value: string;
    }) => void;
}
export declare const Input: ({ className, style, autoFocus, autoSelect, disabled, name, placeholder, required, showClearIcon, showPasswordIcon, type, value, onChange, }: InputProperties) => React.JSX.Element;
export {};
