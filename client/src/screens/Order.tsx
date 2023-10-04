import { Link, useParams } from "react-router-dom";
import { Row, Col, ListGroup, Image } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useGetOrderDetailsQuery } from "../redux/slices/orderApi.slice";
import OrderSummary from "../components/OrderSummary";

const Order = () => {
  const { id } = useParams<string>();
  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(id!);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : order ? (
    <>
      <h1>Order {order._id}</h1>
      <hr />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Address: </strong> {Object.values(order.shippingAddress).join(", ")}
              </p>
              {order.isDelivered ? (
                <Message variant="success">Delivered at {order.paidAt.toString()} </Message>
              ) : (
                <Message variant="danger">Not delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt.toString()} </Message>
              ) : (
                <Message variant="danger">Not paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col md={2}>
                  <h2>Show:</h2>
                </Col>
                <Col md={5}>
                  <Link to={`/product/${order.show._id}`}>
                    <h2>{order.show.name}</h2>
                  </Link>
                </Col>
                <Col md={5}>
                  <h2>
                    {order.ticketsAmounts} X ₪{order.show.price} = ₪{order.ticketsPrice}
                  </h2>
                </Col>
              </Row>
              <Row>
                <Image src={order.show.image} alt={order.show.name} rounded />
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <OrderSummary order={order} />
        </Col>
      </Row>
    </>
  ) : (
    <Message variant="danger">No data</Message>
  );
};

export default Order;
