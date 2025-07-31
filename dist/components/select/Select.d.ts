import React from 'react';
import './Select.css';
export interface SelectProperties {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    value: string;
    values: SelectValue[];
    onChange: (value: string) => void;
}
export interface SelectValue {
    id: string;
    text: string;
}
export declare const Select: ({ className, style, disabled, value, values, onChange, }: SelectProperties) => React.JSX.Element;
