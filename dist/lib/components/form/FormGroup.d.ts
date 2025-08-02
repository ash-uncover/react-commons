import React from 'react';
import { FormGroupDirection } from '../..';
import './FormGroup.css';
interface FormGroupProperties extends React.PropsWithChildren {
    className?: string;
    style?: React.CSSProperties;
    direction?: FormGroupDirection;
}
export declare const FormGroup: ({ className, style, direction, children, }: FormGroupProperties) => React.JSX.Element;
export {};
