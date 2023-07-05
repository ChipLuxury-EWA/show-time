import { Alert } from "react-bootstrap";

const Message = ({ variant, children }: { variant: string; children: string }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
