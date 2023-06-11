import { Nav, Stack } from "react-bootstrap";
import { CgHome, CgUser } from "react-icons/cg";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";

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
          <CgHome className={ICON_CLASS_NAME} />,
          <label className={LABEL_CLASS_NAME}>Home</label>,
        ];
      case "inbox":
        return [
          <HiOutlineEnvelope className={ICON_CLASS_NAME} />,
          <label className={LABEL_CLASS_NAME}>Inbox</label>,
        ];
      case "myShows":
        return [
          <HiOutlineTicket className={ICON_CLASS_NAME} />,
          <label className={LABEL_CLASS_NAME}>My Shows</label>,
        ];
      case "profile":
        return [
          <CgUser className={ICON_CLASS_NAME} />,
          <label className={LABEL_CLASS_NAME}>Profile</label>,
        ];
    }
  };

  return (
    <Nav.Item>
      <Nav.Link eventKey={menuItemType}>
        <Stack className="align-items-end">
          {getIconAndLabel(menuItemType)}
        </Stack>
      </Nav.Link>
    </Nav.Item>
  );
};

export default MenuButton;
