import React from 'react';
import { AppNodeDef } from './AppNodeDef';
export interface AppMenuNodeProperties {
    def: AppNodeDef;
}
export declare const AppMenuNode: ({ def, }: AppMenuNodeProperties) => React.JSX.Element;
