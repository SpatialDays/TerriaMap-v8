// for all the panels and modals we will eventually normalise
import React from "react";
import styled from "styled-components";
// import Box  from "../../Styled/Box";
import Icon from "../../Styled/Icon";
import { RawButton } from "../../Styled/Button";
const StyledCloseButton = styled(RawButton) `
  ${(p) => !p.noAbsolute && `position: absolute;`}
  // width: 20px;
  // height: 20px;
  width: 14px;
  height: 14px;
  ${(p) => p.topRight &&
    `
    top: 15px;
    right:15px;
    `}
  svg {
    // fill: ${(p) => p.color || p.theme.darkWithOverlay};
    fill: ${(p) => p.color};
  }
`;
const CloseButton = (props) => {
    return (React.createElement(StyledCloseButton, Object.assign({}, props),
        React.createElement(Icon, { glyph: Icon.GLYPHS.closeLight })));
};
export default CloseButton;
//# sourceMappingURL=CloseButton.js.map