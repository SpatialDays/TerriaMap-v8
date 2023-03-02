import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { observer } from "mobx-react";
import PrivateIndicator from "../PrivateIndicator/PrivateIndicator";
import Loader from "../Loader";
import Icon from "../../Styled/Icon";
import Styles from "./data-catalog-group.scss";
import Box from "../../Styled/Box";
import Text from "../../Styled/Text";
const CatalogGroupButton = styled.button `
  ${(props) => `
    &:hover,
    &:focus {
      color: ${props.theme.textLight};
      background-color: ${props.theme.modalHighlight};
    }
    ${props.active &&
    `
        color: ${props.theme.textLight};
        background-color: ${props.theme.modalHighlight};
      `}
    `}
`;
/**
 * Dumb component that encapsulated the display logic for a catalog group.
 *
 * @constructor
 */
function CatalogGroup(props) {
    const { t } = useTranslation();
    return (React.createElement("li", { className: Styles.root },
        React.createElement(Text, { fullWidth: true, primary: !props.selected && props.isPrivate },
            props.displayGroup === true && (React.createElement(Box, null,
                React.createElement("button", { type: "button", 
                    // TODO: apply unique styles
                    className: Styles.addRemoveButton, title: props.allItemsLoaded
                        ? t("models.catalog.removeAll")
                        : t("models.catalog.addAll"), 
                    // onClick should call addAll function which I should move out of GroupPreview to separate service file
                    onClick: props.addRemoveButtonFunction },
                    React.createElement(Icon, { glyph: props.allItemsLoaded
                            ? Icon.GLYPHS.remove
                            : Icon.GLYPHS.plusList })))),
            React.createElement(CatalogGroupButton, { type: "button", className: classNames(Styles.btnCatalog, { [Styles.btnCatalogTopLevel]: props.topLevel }, { [Styles.btnIsOpen]: props.open }, { [Styles.isPreviewed]: props.selected }), title: props.title, onClick: props.onClick, active: props.selected },
                React.createElement(If, { condition: !props.topLevel },
                    React.createElement("span", { className: Styles.folder }, props.open ? (React.createElement(Icon, { glyph: Icon.GLYPHS.folderOpen })) : (React.createElement(Icon, { glyph: Icon.GLYPHS.folder })))),
                React.createElement(Box, { justifySpaceBetween: true },
                    React.createElement(Box, null, props.text),
                    React.createElement(Box, { centered: true },
                        props.isPrivate && React.createElement(PrivateIndicator, null),
                        React.createElement("span", { className: classNames(Styles.caret, {
                                [Styles.offsetRight]: props.removable
                            }) }, props.open ? (React.createElement(Icon, { glyph: Icon.GLYPHS.opened })) : (React.createElement(Icon, { glyph: Icon.GLYPHS.closed }))),
                        React.createElement(If, { condition: props.removable },
                            React.createElement("button", { type: "button", className: Styles.trashGroup, title: t("dataCatalog.groupRemove"), onClick: props.removeUserAddedData },
                                React.createElement(Icon, { glyph: Icon.GLYPHS.trashcan }))))))),
        React.createElement(If, { condition: props.open },
            React.createElement("ul", { className: classNames(Styles.catalogGroup, {
                    [Styles.catalogGroupLowerLevel]: !props.topLevel
                }) },
                React.createElement(Choose, null,
                    React.createElement(When, { condition: props.loading },
                        React.createElement("li", { key: "loader" },
                            React.createElement(Loader, null))),
                    React.createElement(When, { condition: props.children.length === 0 && props.emptyMessage },
                        React.createElement("li", { className: classNames(Styles.label, Styles.labelNoResults), key: "empty" }, props.emptyMessage))),
                props.children))));
}
CatalogGroup.propTypes = {
    text: PropTypes.string,
    isPrivate: PropTypes.bool,
    title: PropTypes.string,
    topLevel: PropTypes.bool,
    open: PropTypes.bool,
    loading: PropTypes.bool,
    emptyMessage: PropTypes.string,
    onClick: PropTypes.func,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element)
    ]),
    selected: PropTypes.bool,
    removable: PropTypes.bool,
    removeUserAddedData: PropTypes.func,
    displayGroup: PropTypes.bool,
    allItemsLoaded: PropTypes.bool,
    addRemoveButtonFunction: PropTypes.func
};
export default observer(CatalogGroup);
//# sourceMappingURL=CatalogGroup.js.map