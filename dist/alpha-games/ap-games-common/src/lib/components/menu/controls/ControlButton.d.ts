import React, { ReactNode } from 'react';
import './ControlButton.css';
export interface ControlButtonProperties {
    className?: string;
    disabled?: boolean;
    title?: string;
    children: ReactNode;
    onClick: () => void;
}
export declare const ControlButton: ({ className, disabled, title, children, onClick, }: ControlButtonProperties) => React.JSX.Element;
