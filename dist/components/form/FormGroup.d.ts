import React, { CSSProperties, ReactNode } from 'react';
import { FormGroupDirection } from './FormGroupDirection';
import './FormGroup.css';
interface FormGroupProperties {
    className?: string;
    style?: CSSProperties;
    direction?: FormGroupDirection;
    children: ReactNode;
}
export declare const FormGroup: ({ className, style, direction, children, }: FormGroupProperties) => React.JSX.Element;
export {};
