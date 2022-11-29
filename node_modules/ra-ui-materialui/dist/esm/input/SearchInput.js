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
import * as React from 'react';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useTranslate } from 'ra-core';
import { TextInput } from './TextInput';
export var SearchInput = function (props) {
    var translate = useTranslate();
    if (props.label) {
        throw new Error("<SearchInput> isn't designed to be used with a label prop. Use <TextInput> if you need a label.");
    }
    return (React.createElement(StyledTextInput, __assign({ hiddenLabel: true, label: "", resettable: true, placeholder: translate('ra.action.search'), InputProps: {
            endAdornment: (React.createElement(InputAdornment, { position: "end" },
                React.createElement(SearchIcon, { color: "disabled" }))),
        }, size: "small" }, props)));
};
var PREFIX = 'RaSearchInput';
var StyledTextInput = styled(TextInput, {
    name: PREFIX,
    overridesResolver: function (props, styles) { return styles.root; },
})({
    marginTop: 0,
});
//# sourceMappingURL=SearchInput.js.map