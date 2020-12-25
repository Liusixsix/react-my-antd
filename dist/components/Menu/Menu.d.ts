import React from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    defaultIndex?: string;
    clasName?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: (selectdIndex: string) => void;
    defaultOpenSubMenus?: string[];
}
export interface IMenuContext {
    index: string;
    onSelect?: (selectdIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
declare const Menu: React.FC<MenuProps>;
export default Menu;
