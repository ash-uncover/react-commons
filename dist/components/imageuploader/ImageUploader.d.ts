import React from 'react';
import './ImageUploader.css';
export declare const MAX_SIZE = 2100000;
interface IType {
    ext: string;
    template: string;
}
export declare const TYPES: IType[];
export declare const TYPES_ACCEPT: string[];
export declare const TYPES_EXT: string[];
interface ImageUploaderProperties {
    className?: string;
    style?: React.CSSProperties;
    name: string;
    src: string;
    onChange: (event: {
        file: any;
    }) => void;
}
export declare const ImageUploader: ({ name, src, onChange }: ImageUploaderProperties) => React.JSX.Element;
export {};
