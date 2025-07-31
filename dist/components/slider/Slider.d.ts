import React from 'react';
import './Slider.css';
export interface SliderProperties {
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (event: {
        value: number;
    }) => void;
}
export declare const Slider: ({ className, disabled, min, max, step, value, onChange, }: SliderProperties) => React.JSX.Element;
