import { ReactElement } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
export type MenuMode = 'RIGHT' | 'TOP' | 'BOTTOM' | 'NONE';
export declare const MenuModes: {
    RIGHT: MenuMode;
    TOP: MenuMode;
    BOTTOM: MenuMode;
    NONE: MenuMode;
};
export interface IMenu {
    component?: ReactElement;
    items: IMenuItem[];
    mode?: MenuMode;
}
export interface IMenuItem {
    component?: ReactElement;
    confirmBack?: boolean;
    description?: string;
    icon?: IconProp;
    items?: IMenuItem[];
    name?: string;
}
export interface IMenuItemDef {
    parents: IMenuItemDef[];
    name?: string;
    description?: string;
    confirmBack?: boolean;
    icon?: IconProp;
    component?: ReactElement;
    items?: IMenuItemDef[];
}
export declare function flattenMenu(menu: IMenu): IMenuItemDef[];
export declare function flattenMenuItem(parents: IMenuItemDef[], menuItem: IMenuItem): IMenuItemDef[];
export declare function buildMenuItemDef(parents: IMenuItemDef[], item: IMenuItem): IMenuItemDef;
export declare function getParent(item: IMenuItemDef): IMenuItemDef | null;
export declare function findItemDefinition(itemDefinitions: IMenuItemDef[], item: IMenuItem): IMenuItemDef | null;
export declare function equals(itemDefinition: IMenuItemDef, item: IMenuItem): boolean;
