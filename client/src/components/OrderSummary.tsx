import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Loader from "../components/Loader";

export interface IOrder {
  _id: string;
  show: any;
  user: any;
  shippingAddress: string;
  paymentMethod: string;
  ticketsAmounts: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  userId: string;
  paidAt: Date;
  isPaid: boolean;
  isDelivered: boolean;
}

export interface IOrderButton {
  handleClick: Function;
  isLoading: boolean;
  value: string;
}

const OrderSummary = ({ order, button }: { order: IOrder; button?: IOrderButton }) => {
  return (
    <Card>
      <ListGroup variant="flush">
        <ListGroup.Item>
          <h2>Order Summary</h2>
        </ListGroup.Item>
        <ListGroup.Item>
          <Row>
            <Col>Tickets:</Col>
            <Col>₪{order.itemsPrice}</Col>
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
            <Col>₪{(order.itemsPrice + order.taxPrice).toFixed(2)}</Col>
          </Row>
        </ListGroup.Item>
        {button?.handleClick ? (
          <ListGroup.Item
            action
            variant="primary"
            onClick={() => button.handleClick()}
            className="d-flex justify-content-center"
          >
            {button.isLoading ? (
              <Loader height="28px" width="28px" marginTop="0px" />
            ) : (
              <h4 style={{ margin: 0 }}>{button?.value}</h4>
            )}
          </ListGroup.Item>
        ) : (
          ""
        )}
      </ListGroup>
    </Card>
  );
};

export default OrderSummary;
