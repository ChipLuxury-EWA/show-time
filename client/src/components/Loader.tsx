import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{ width: "150px", height: "150px", margin: "auto", display: "block", marginTop: "40vh" }}
    />
  );
};

export default Loader;
