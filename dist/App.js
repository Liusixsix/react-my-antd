var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { useState } from "react";
import Button, { ButtonSize, ButtonType } from "./components/Button";
import Menu from "./components/Menu";
import MenuItem from "./components/Menu/item";
import SubMenu from "./components/Menu/subMenu";
import Icon from "./components/Icon";
import AutoComplete from "./components/AutoComplete/AutoComplete";
import { Upload } from "./components/Upload/Upload";
function App() {
    var _a = useState(), val = _a[0], setVal = _a[1];
    var handleFetch = function (query) {
        return fetch("https://api.github.com/search/users?q=" + query).then(function (res) { return res.json(); })
            .then(function (_a) {
            var items = _a.items;
            return items.slice(0, 10).map(function (item) { return (__assign({ value: item.login }, item)); });
        });
    };
    var handleSelect = function (item) {
        // console.log(str)
        setVal(item);
    };
    var renderOption = function (item) {
        return React.createElement("span", null,
            "name : ",
            item.value);
    };
    var filePromise = function (file) {
        var newFile = new File([file], 'newname.jpg', { type: file.type });
        return Promise.resolve(newFile);
    };
    var checkFileSize = function (file) {
        if (file.size > 2140000) {
            return false;
        }
        return true;
    };
    return (React.createElement("div", { className: "App" },
        React.createElement(Button, { disabled: true }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Primary, size: ButtonSize.Large }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Danger, size: ButtonSize.Large }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Default, size: ButtonSize.Large }, "hello"),
        React.createElement(Button, { btnType: ButtonType.Link, href: "/" }, "hellp"),
        React.createElement(Icon, { icon: "coffee", theme: "danger", size: "10x" }),
        React.createElement(Menu, { mode: "vertical", defaultOpenSubMenus: ["2"], defaultIndex: "0", onSelect: function (index) { return alert(index); } },
            React.createElement(MenuItem, null, "cool link"),
            React.createElement(MenuItem, { disabled: true }, "cool link2"),
            React.createElement(SubMenu, { title: "\u6D4B\u8BD5" },
                React.createElement(MenuItem, null, "cool link3"),
                React.createElement(MenuItem, null, "cool link4"))),
        React.createElement(AutoComplete, { renderOption: renderOption, value: val, fetchSuggestions: handleFetch, onSelect: handleSelect }),
        React.createElement(Upload, { action: 'https://jsonplaceholder.typicode.com/posts/', accept: '.jpg', multiple: true, drag: true },
            React.createElement(Button, { btnType: ButtonType.Primary }, "\u4E0A\u4F20 upload"))));
}
export default App;
