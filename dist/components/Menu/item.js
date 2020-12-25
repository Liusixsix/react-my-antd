import React, { useContext } from 'react';
import classnames from 'classnames';
import { MenuContext } from './Menu';
var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    var context = useContext(MenuContext);
    var classes = classnames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    var hanldeClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (React.createElement("li", { className: classes, style: style, onClick: hanldeClick }, children));
};
// MenuItem
MenuItem.displayName = 'MenuItem';
export default MenuItem;
