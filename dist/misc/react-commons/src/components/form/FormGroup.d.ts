import React, { CSSProperties, ReactNode } from 'react';
import './FormGroup.css';
export type FormGroupDirection = 'Vertical' | 'Horizontal';
export declare const FormGroupDirections: {
    HORIZONTAL: FormGroupDirection;
    VERTICAL: FormGroupDirection;
};
interface FormGroupProperties {
    className?: string;
    style?: CSSProperties;
    direction?: FormGroupDirection;
    children: ReactNode;
}
export declare const FormGroup: ({ className, style, direction, children, }: FormGroupProperties) => React.JSX.Element;
export {};
