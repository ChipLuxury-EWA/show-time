import { useSelector } from "react-redux";
import { CgUser } from "react-icons/cg";
import { Nav, NavDropdown, Stack } from "react-bootstrap";

const IconAndName = ({ name }: { name: string }) => {
  return (
    <Stack>
      <CgUser className="align-self-center" />
      {name}
    </Stack>
  );
};

const ProfileButton = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const logoutHandler = () => {
    console.log("Logging out fe - profileButton.tsx");
  };

  return (
    <>
      {userInfo ? (
        <NavDropdown id="profile-dropdown" drop="up" title={<IconAndName name={userInfo.name} />}>
          <NavDropdown.Item eventKey="profile">Profile</NavDropdown.Item>
          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
      ) : (
        <Nav.Item>
          <Nav.Link eventKey="user/login">
            <Stack className="align-items-end">
              <CgUser className="align-self-center" />
              <span className="align-self-center text-nowrap">Login</span>
            </Stack>
          </Nav.Link>
        </Nav.Item>
      )}
    </>
  );
};

export default ProfileButton;
