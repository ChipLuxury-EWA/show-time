import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }: any) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
