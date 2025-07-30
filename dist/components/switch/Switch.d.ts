import React from 'react';
import './Switch.css';
export interface SwitchProperties {
    className?: string;
    style?: React.CSSProperties;
    checked: boolean;
    label: string;
    onChange: (event: {
        value: boolean;
    }) => void;
}
export declare const Switch: ({ className, style, checked, label, onChange, }: SwitchProperties) => React.JSX.Element;
