import React, { ReactNode } from 'react';
import './Label.css';
interface LabelProperties {
    className?: string;
    style?: React.CSSProperties;
    text?: string;
    children?: ReactNode;
}
export declare const Label: ({ className, style, text, children, }: LabelProperties) => React.JSX.Element;
export {};
