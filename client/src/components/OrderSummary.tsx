import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";

export interface IOrder {
  _id: string;
  show: any;
  user: any;
  shippingAddress: string;
  paymentMethod: string;
  ticketsAmounts: number;
  ticketsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  userId: string;
  paidAt: Date;
  isPaid: boolean;
  isDelivered: boolean;
}

const OrderSummary = ({ order }: { order: IOrder }) => {
  return (
    <Card>
      <ListGroup>
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tickets:</Col>
            <Col>₪{order.ticketsPrice}</Col>
          </Row>
        </ListGroup.Item>
        {order.shippingPrice ? (
          <ListGroup.Item>
            <Row>
              <Col>Shipping:</Col>
              <Col>₪{order.shippingPrice}</Col>
            </Row>
          </ListGroup.Item>
        ) : (
          ""
        )}
        <ListGroup.Item>
          <Row>
            <Col>Tax:</Col>
            <Col>₪{order.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>
              <strong>Total price:</strong>
            </Col>
            <Col>₪{order.ticketsPrice + order.taxPrice}</Col>
          </Row>
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
