import React from 'react';
import './TextArea.css';
interface TextAreaProperties {
    className?: string;
    style?: React.CSSProperties;
    autoFocus?: boolean;
    disabled?: boolean;
    name?: string;
    placeholder?: string;
    required?: boolean;
    rows?: number;
    value?: string;
    onChange: (event: {
        value: string;
    }) => void;
}
export declare const TextArea: ({ className, style, autoFocus, disabled, name, placeholder, required, rows, value, onChange, }: TextAreaProperties) => React.JSX.Element;
export {};
