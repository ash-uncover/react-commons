import React from 'react';
import './Slider.css';
interface SliderProperties {
    className?: string;
    style?: React.CSSProperties;
    max: number;
    min?: number;
    value: number;
    onChange: (event: {
        value: number;
    }) => void;
}
export declare const Slider: ({ className, style, max, min, value, onChange, }: SliderProperties) => React.JSX.Element;
export {};
