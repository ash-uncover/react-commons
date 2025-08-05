import React from 'react';
import { IMenuItemDef } from './MenuUtil';
export declare const MenuDispatchContext: React.Context<React.Dispatch<any>>;
interface MenuProviderProperties extends React.PropsWithChildren {
    items: IMenuItemDef[];
}
export declare const MenuProvider: ({ items, children }: MenuProviderProperties) => React.JSX.Element;
export declare const useMenuItemSelected: () => IMenuItemDef | null;
export declare const useMenuItemComponent: () => IMenuItemDef | null;
export declare const useMenuItemNavigation: () => IMenuItemDef | null;
export declare const useSelectItem: () => (itemSelection: IMenuItemDef) => void;
export declare const useGoBack: () => () => void;
export {};
