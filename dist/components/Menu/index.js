import Menu from './Menu';
import SubMenu from './subMenu';
import MenuItem from './item';
var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;
export default TransMenu;
