import React, { ReactNode } from 'react';
import { TitleLevel } from '../..';
import './Title.css';
interface TitleProperties {
    className?: string;
    style?: React.CSSProperties;
    level?: TitleLevel;
    text?: string;
    children?: ReactNode;
}
export declare const Title: ({ className, style, level, text, children, }: TitleProperties) => React.ReactElement<{
    className: string;
    style: React.CSSProperties | undefined;
}, string | React.JSXElementConstructor<any>>;
export {};
