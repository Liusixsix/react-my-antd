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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import Input from '../Input/input';
import { useDebounce } from '../../hooks/useDebounce';
import { useClickOutsode } from '../../hooks/useClickOutside';
var AutoComplete = function (props) {
    var fetchSuggestions = props.fetchSuggestions, onSelect = props.onSelect, value = props.value, renderOption = props.renderOption, restProps = __rest(props, ["fetchSuggestions", "onSelect", "value", "renderOption"]);
    var _a = useState(value), inputValue = _a[0], setInputValue = _a[1];
    var _b = useState([]), suggestions = _b[0], setSuggestions = _b[1];
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var _d = useState(-1), highlightIndex = _d[0], setHighlightIndex = _d[1];
    var triggerFlag = useRef(false);
    var componentRef = useRef(null);
    var debouncedValue = useDebounce(inputValue);
    useClickOutsode(componentRef, function (e) { return setSuggestions([]); });
    useEffect(function () {
        if (debouncedValue && triggerFlag.current) {
            var result = fetchSuggestions(debouncedValue);
            if (result instanceof Promise) {
                setLoading(true);
                result.then(function (data) {
                    setLoading(false);
                    setSuggestions(data);
                });
            }
            else {
                setSuggestions(result);
            }
        }
        else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);
    var highlight = function (index) {
        if (index < 0)
            index = 0;
        if (index >= suggestions.length) {
            index = suggestions.length - 1;
        }
        setHighlightIndex(index);
    };
    var handleKeyDown = function (e) {
        switch (e.keyCode) {
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            case 38:
                highlight(highlightIndex - 1);
                break;
            case 40:
                highlight(highlightIndex + 1);
                break;
            case 27:
                setSuggestions([]);
                break;
            default:
        }
    };
    var handelChange = function (e) {
        var value = e.target.value.trim();
        setInputValue(value);
        triggerFlag.current = true;
    };
    var handleSelect = function (item) {
        setInputValue(item.value);
        setSuggestions([]);
        if (onSelect) {
            onSelect(item);
        }
        triggerFlag.current = false;
    };
    var renderTemplate = function (item) {
        return renderOption ? renderOption(item) : item;
    };
    var generateDrodown = function () {
        return (React.createElement("ul", null, suggestions.map(function (item, index) {
            var classes = classNames('suggestion-item', {
                'item-highlighted': index === highlightIndex
            });
            return (React.createElement("li", { className: classes, key: index, onClick: function () { return handleSelect(item); } }, renderTemplate(item)));
        })));
    };
    return (React.createElement("div", { className: 'viking-auto-complete', ref: componentRef },
        React.createElement(Input, __assign({ value: inputValue, onChange: handelChange, onKeyDown: handleKeyDown }, restProps)),
        loading && React.createElement("ul", null, "loading..."),
        suggestions.length > 0 && generateDrodown()));
};
export default AutoComplete;
