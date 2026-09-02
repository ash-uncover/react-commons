import React from 'react';
import './Carousel.css';
interface CarouselProperties {
    className?: string;
    direction?: string;
    children?: React.ReactNode;
}
export declare const getClassName: (className?: string) => string;
export declare const Carousel: ({ className, children, }: CarouselProperties) => React.JSX.Element;
export {};
