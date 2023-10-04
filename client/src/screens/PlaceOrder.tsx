import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { toast } from "react-toastify";

import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../redux/slices/orderApi.slice";
import { clearCartItems } from "../redux/slices/cart.slice";
import OrderSummary, { IOrderButton } from "../components/OrderSummary";

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
        itemsPrice,
        taxPrice,
        shippingPrice,
        userId,
      }).unwrap();

      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error: any) {
      toast.error(error.data.message);
      // TODO tompo fix bug error when user not logged in (jwt token)
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
  const button: IOrderButton = {
    value: "Place order",
    handleClick: placeOrderHandler,
    isLoading,
  };

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
              {isCartEmpty ? (
                <ListGroup.Item>
                  <Message variant="info" marginTop="1vh">
                    {"Add show to cart"}
                  </Message>
                </ListGroup.Item>
              ) : (
                <OrderSummary order={cart} button={button} />
              )}
            </ListGroup>
          </Card>
          {error && <Message variant="danger">{error}</Message>}
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrder;
