import { Navbar, Nav, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import MenuButton from "./MenuButton";

const Footer = () => {
  const navigate = useNavigate();

  const handleOnSelect = (eventKey: string) => {
    navigate(`/${eventKey}`);
    console.log(`pressed ${eventKey}`);
  };
  const menuItemsTypes = ["home", "inbox", "myShows", "profile"];
  const menuItemsDynamicList = menuItemsTypes.map((type) => (
    <MenuButton key={type} menuItemType={type} />
  ));

  return (
    <footer>
      <Navbar fixed="bottom" bg="light" variant="light">
        <Container fluid>
          <Nav
            className="vw-100"
            fill
            defaultActiveKey="home"
            onSelect={(eventKey) => {
              handleOnSelect(eventKey!);
            }}
          >
            {menuItemsDynamicList}
          </Nav>
        </Container>
      </Navbar>
    </footer>
  );
};

export default Footer;
