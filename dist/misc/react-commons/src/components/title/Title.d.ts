import React, { ReactNode } from 'react';
import './Title.css';
export type TitleLevel = 'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6';
export declare const TitleLevels: {
    H1: TitleLevel;
    H2: TitleLevel;
    H3: TitleLevel;
    H4: TitleLevel;
    H5: TitleLevel;
    H6: TitleLevel;
};
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
