import React from 'react';
import './Slider.css';
export interface SliderProperties {
    className?: string;
    disabled?: boolean;
    label: string;
    min: number;
    max: number;
    step?: number;
    value: number;
    onChange: (arg: number) => void;
}
export declare const Slider: ({ className, disabled, label, min, max, step, value, onChange, }: SliderProperties) => React.JSX.Element;
