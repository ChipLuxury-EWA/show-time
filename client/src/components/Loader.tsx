import { Spinner } from "react-bootstrap";

const Loader = ({
  width,
  height,
  margin,
  marginTop,
}: {
  width: string;
  height: string;
  margin: string;
  marginTop: string;
}) => {
  return <Spinner animation="border" role="status" style={{ width, height, margin, display: "block", marginTop }} />;
};

Loader.defaultProps = {
  width: "150px",
  height: "150px",
  margin: "auto",
  marginTop: "40vh",
};

export default Loader;
