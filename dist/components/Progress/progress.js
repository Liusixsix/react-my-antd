import React from 'react';
export var Progress = function (props) {
    var percent = props.percent, storekeHight = props.storekeHight, showText = props.showText, styles = props.styles, theme = props.theme;
    return (React.createElement("div", { className: 'viking-progress-bar', style: styles },
        React.createElement("div", { className: 'viking-progress-bar-outer', style: { height: storekeHight + "px" } },
            React.createElement("div", { className: "viking-progress-bar-inner color-" + theme, style: { width: percent + "%" } }, showText && React.createElement("span", { className: 'inner-text' }, percent + "%")))));
};
Progress.defaultProps = {
    storekeHight: 15,
    showText: true,
    theme: 'primary'
};
