import { Nav, Stack } from "react-bootstrap";
import { CgHome, CgShoppingCart } from "react-icons/cg";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import ProductsInCartBadge from "./ProductsInCartBadge";

interface MenuItemType {
  menuItemType: string;
}

const MenuButton = ({ menuItemType }: MenuItemType) => {
  const ICON_CLASS_NAME = "align-self-center";
  const LABEL_CLASS_NAME = "align-self-center text-nowrap";

  const getIconAndLabel = (menuItemType: string) => {
    // return the icon component and the button label:
    switch (menuItemType) {
      case "home":
        return [
          <CgHome key={menuItemType + "icon"} className={ICON_CLASS_NAME} />,
          <span key={menuItemType + "label"} className={LABEL_CLASS_NAME}>
            Home
          </span>,
        ];
      case "inbox":
        return [
          <HiOutlineEnvelope key={menuItemType + "icon"} className={ICON_CLASS_NAME} />,
          <span key={menuItemType + "label"} className={LABEL_CLASS_NAME}>
            Inbox
          </span>,
        ];
      case "myShows":
        return [
          <HiOutlineTicket key={menuItemType + "icon"} className={ICON_CLASS_NAME} />,
          <span key={menuItemType + "label"} className={LABEL_CLASS_NAME}>
            My Shows
          </span>,
        ];
      case "cart":
        return [
          <CgShoppingCart key={menuItemType + "icon"} className={ICON_CLASS_NAME} />,
          <span key={menuItemType + "label"} className={LABEL_CLASS_NAME}>
            Cart
            <ProductsInCartBadge/>
          </span>,
        ];
    }
  };

  return (
    <Nav.Item>
      <Nav.Link eventKey={menuItemType}>
        <Stack className="align-items-end">{getIconAndLabel(menuItemType)}</Stack>
      </Nav.Link>
    </Nav.Item>
  );
};

export default MenuButton;
