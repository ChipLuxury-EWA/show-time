import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CgUser } from "react-icons/cg";
import { Nav, NavDropdown, Stack } from "react-bootstrap";
import { useLogoutMutation } from "../redux/slices/userApi.slice";
import { clearCredentials } from "../redux/slices/auth.slice";

const IconAndName = ({ name }: { name: string }) => {
  return (
    <Stack>
      <CgUser className="align-self-center" />
      {name}
    </Stack>
  );
};

const ProfileButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("user/login");
    } catch (error) {
      console.log(error);
    }
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
