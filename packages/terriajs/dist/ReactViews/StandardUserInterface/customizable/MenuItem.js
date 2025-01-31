import MenuButton from "../../Map/MenuButton";
import responsiveSwitch from "./ResponsiveSwitch";
import withControlledVisibility from "../../HOCs/withControlledVisibility";
import MobileMenuItem from "../../Mobile/MobileMenuItem";
const MenuItem = withControlledVisibility(responsiveSwitch(MenuButton, MobileMenuItem));
export default MenuItem;
//# sourceMappingURL=MenuItem.js.map