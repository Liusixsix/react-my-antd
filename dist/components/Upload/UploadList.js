import React from 'react';
import Icon from '../Icon';
import { Progress } from '../Progress/progress';
export var UploadList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: 'viking-upload-list' }, fileList.map(function (item) {
        return (React.createElement("li", { key: item.uid, className: 'viking-upload-list-item' },
            React.createElement("span", { className: "file-name file-name-" + item.status },
                React.createElement(Icon, { icon: 'file-alt', theme: 'secondary' }),
                item.name),
            React.createElement("span", { className: 'file-status' },
                item.status === 'loading' && React.createElement("span", null, "loading..."),
                item.status === 'success' && React.createElement("span", null, "success"),
                item.status === 'error' && React.createElement("span", null, "error")),
            React.createElement("span", { className: 'file-actions', onClick: function () { return onRemove(item); } }, "X"),
            item.status === 'loading' &&
                React.createElement(Progress, { percent: item.percent || 0 })));
    })));
};
