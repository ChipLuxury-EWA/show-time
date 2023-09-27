import { Alert } from "react-bootstrap";

const Message = ({
  variant,
  children,
  marginTop,
}: {
  variant: string;
  children: string | string[] | JSX.Element | JSX.Element[];
  marginTop: string;
}) => {
  return (
    <Alert variant={variant} style={{ marginTop: marginTop }}>
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: "info",
  marginTop: "0vh",
};

export default Message;
