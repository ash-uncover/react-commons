import React, { ReactNode } from 'react';
import './ShellNavbar.css';
interface ShellNavbarProperties {
    className?: string;
    style?: React.CSSProperties;
    appLogo?: string;
    appTitle: string;
    children?: ReactNode;
}
export declare const ShellNavbar: ({ className, style, appLogo, appTitle, children, }: ShellNavbarProperties) => React.JSX.Element;
export {};
