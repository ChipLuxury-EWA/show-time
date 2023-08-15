import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../redux/slices/userApi.slice";
import { setCredentials } from "../redux/slices/auth.slice";
import { toast } from "react-toastify";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state: any) => state.auth);
  const [register, { isLoading }] = useRegisterMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/home";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      toast.error("Passwords does mot match");
    } else {
      try {
        const answer = await register({ name, email, password }).unwrap();
        dispatch(setCredentials(answer));
        navigate(redirect);
      } catch (error: any) {
        toast.error(error?.data?.message || error?.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name" className="my-3">
          <Form.Label>Full name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmedPassword" className="my-3">
          <Form.Label>confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter the same password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
            ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Row xs="auto">
            <Col>
              <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>
                Sign up
              </Button>
            </Col>
            <Col>{isLoading && <Loader height="30px" width="30px" marginTop="11px" />}</Col>
          </Row>
        </Form.Group>
      </Form>

      <Row className="py-3">
        <Col>
          already have an account?{" "}
          <Link to={redirect ? `/user/login?redirect=${redirect}` : "/user/login"}>Login now!</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Register;
