import * as React from 'react';
import { useRef, useEffect, cloneElement } from 'react';
import { usePreferencesEditor, PreferenceKeyContextProvider, useTranslate, } from 'ra-core';
import { alpha, Badge } from '@mui/material';
import { styled } from '@mui/material/styles';
import SettingsIcon from '@mui/icons-material/Settings';
import clsx from 'clsx';
/**
 * Wrap any component with this component to make it configurable
 *
 * When the edit mode is enabled, users will see a button to edit the component;
 * when clicked, the inspector will show the editor element.
 *
 * Creates a context for the preference key, so that both the child component
 * and the editor can access it using usePreferenceKey();
 *
 * @example
 * const ConfigurableTextBlock = ({ preferenceKey = "TextBlock", ...props }) => (
 *     <Configurable editor={<TextBlockInspector />} preferenceKey={preferenceKey}>
 *         <TextBlock {...props} />
 *     </Configurable>
 * );
 */
export var Configurable = function (props) {
    var children = props.children, editor = props.editor, preferenceKey = props.preferenceKey, _a = props.openButtonLabel, openButtonLabel = _a === void 0 ? 'ra.configurable.customize' : _a, sx = props.sx;
    var prefixedPreferenceKey = "preferences.".concat(preferenceKey);
    var preferencesEditorContext = usePreferencesEditor();
    var hasPreferencesEditorContext = !!preferencesEditorContext;
    var translate = useTranslate();
    var _b = preferencesEditorContext || {}, isEnabled = _b.isEnabled, setEditor = _b.setEditor, currentPreferenceKey = _b.preferenceKey, setPreferenceKey = _b.setPreferenceKey;
    var isEditorOpen = prefixedPreferenceKey === currentPreferenceKey;
    var editorOpenRef = useRef(isEditorOpen);
    useEffect(function () {
        editorOpenRef.current = isEditorOpen;
    }, [isEditorOpen]);
    // on unmount, if selected, remove the editor
    useEffect(function () {
        return function () {
            if (!editorOpenRef.current)
                return;
            setPreferenceKey && setPreferenceKey(null);
            setEditor && setEditor(null);
        };
    }, [setEditor, setPreferenceKey]);
    if (!hasPreferencesEditorContext) {
        return children;
    }
    var handleOpenEditor = function () {
        // include the editorKey as key to force destroy and mount
        // when switching between two identical editors with different editor keys
        // otherwise the editor will see an update and its useStore will return one tick later
        // which would forbid the usage of uncontrolled inputs in the editor
        setEditor(cloneElement(editor, {
            preferenceKey: prefixedPreferenceKey,
            key: prefixedPreferenceKey,
        }));
        // as we modify the editor, isEditorOpen cannot compare the editor element
        // we'll compare the editor key instead
        setPreferenceKey(prefixedPreferenceKey);
    };
    return (React.createElement(PreferenceKeyContextProvider, { value: prefixedPreferenceKey },
        React.createElement(Root, { className: clsx(isEnabled && ConfigurableClasses.editMode, isEditorOpen && ConfigurableClasses.editorActive), sx: sx },
            React.createElement(Badge, { badgeContent: React.createElement(SettingsIcon
                // @ts-ignore
                , { 
                    // @ts-ignore
                    fontSize: "12px" }), componentsProps: {
                    badge: {
                        title: translate(openButtonLabel),
                        onClick: handleOpenEditor,
                    },
                }, color: "warning", invisible: !isEnabled }, children))));
};
var PREFIX = 'RaConfigurable';
export var ConfigurableClasses = {
    editMode: "".concat(PREFIX, "-editMode"),
    button: "".concat(PREFIX, "-button"),
    editorActive: "".concat(PREFIX, "-editorActive"),
};
var Root = styled('span', {
    name: PREFIX,
    overridesResolver: function (props, styles) { return styles.root; },
})(function (_a) {
    var _b;
    var theme = _a.theme;
    return (_b = {},
        _b["& .MuiBadge-badge"] = {
            visibility: 'hidden',
            pointerEvents: 'none',
            padding: 0,
        },
        _b["&.".concat(ConfigurableClasses.editMode, ":hover > .MuiBadge-root > .MuiBadge-badge")] = {
            visibility: 'visible',
            pointerEvents: 'initial',
            cursor: 'pointer',
        },
        _b["&.".concat(ConfigurableClasses.editMode, " > .MuiBadge-root > :not(.MuiBadge-badge)")] = {
            transition: theme.transitions.create('outline'),
            outline: "".concat(alpha(theme.palette.warning.main, 0.3), " solid 2px"),
        },
        _b["&.".concat(ConfigurableClasses.editMode, ":hover > .MuiBadge-root > :not(.MuiBadge-badge)")] = {
            outline: "".concat(alpha(theme.palette.warning.main, 0.5), " solid 2px"),
        },
        _b["&.".concat(ConfigurableClasses.editMode, ".").concat(ConfigurableClasses.editorActive, " > .MuiBadge-root > :not(.MuiBadge-badge), &.").concat(ConfigurableClasses.editMode, ".").concat(ConfigurableClasses.editorActive, ":hover > .MuiBadge-root > :not(.MuiBadge-badge)")] = {
            outline: "".concat(theme.palette.warning.main, " solid 2px"),
        },
        _b);
});
//# sourceMappingURL=Configurable.js.map