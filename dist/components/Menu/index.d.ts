import React from 'react';
import { MenuProps } from './Menu';
import { SubMenuProps } from './subMenu';
import { MenuItemProps } from './item';
export declare type IMenuComponent = React.FC<MenuProps> & {
    Item: React.FC<MenuItemProps>;
    SubMenu: React.FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
