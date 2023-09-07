import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../redux/slices/orderApi.slice";
import { clearCartItems } from "../redux/slices/cart.slice";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: any) => state.cart);
  const auth = useSelector((state: any) => state.auth);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  const { userInfo } = auth;
  const { _id: userId } = userInfo;

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    const { cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice } = cart;

    try {
      const res = await createOrder({
        show: cartItems[0]._id,
        shippingAddress,
        paymentMethod,
        ticketsAmounts: cartItems[0].chosenTicketsAmount,
        ticketsPrice: itemsPrice,
        taxPrice,
        shippingPrice,
        userId,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error: any) {
      toast.error(error);
    }
  };

  const renderOrderItems = cart.cartItems.map((item: any, index: number) => {
    return (
      <ListGroup.Item key={item._id}>
        <Row>
          <Col md={1}>
            <Image src={item.image} alt={item.name} fluid rounded />
          </Col>
          <Col>
            <Link to={`/product/${item._id}`}>{item.name}</Link>
          </Col>
          <Col md={4}>
            {item.chosenTicketsAmount} X ₪{item.price} = ₪{item.chosenTicketsAmount * item.price}
          </Col>
        </Row>
      </ListGroup.Item>
    );
  });

  const isCartEmpty = cart.cartItems.length === 0;

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {Object.values(cart.shippingAddress).join(", ")}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              <ListGroup>{renderOrderItems}</ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              {isCartEmpty ? (
                <ListGroup.Item>
                  <Message variant="info" marginTop="1vh">
                    {"Choose show"}
                  </Message>
                </ListGroup.Item>
              ) : (
                <>
                  <ListGroup.Item>
                    <Row>
                      <Col>Items:</Col>
                      <Col>₪{cart.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Tax price:</Col>
                      <Col>₪{cart.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping:</Col>
                      <Col>₪{cart.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <strong>Total price:</strong>
                      </Col>
                      <Col>₪{cart.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>
                </>
              )}

              <ListGroup.Item>
                <Row>
                  <Button
                    onClick={placeOrderHandler}
                    type="button"
                    className="btn-block"
                    disabled={isCartEmpty || isLoading}
                    size="lg"
                  >
                    {isLoading ? <Loader height="30px" width="30px" marginTop="0px" /> : "Place order"}
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
          {error && <Message variant="danger">{error}</Message>}
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
