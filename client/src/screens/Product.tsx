import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetShowByIdQuery } from "../redux/slices/shows.slice";
import { addToCart } from "../redux/slices/cart.slice";

const Product = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id: showId } = useParams() as { id: any };
  const { data: showData, isLoading, isError, error } = useGetShowByIdQuery(showId);

  const [ticketsInStock, setTicketsInStock] = useState<number>(0);
  const [chosenTicketsAmount, setChosenTicketsAmount] = useState<number>(1);

  const handleTicketsSelect = (e: any) => {
    setChosenTicketsAmount(e.target.value);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...showData, chosenTicketsAmount }));
    navigate("/cart");
  };

  const dynamicOptions = Array.from({ length: ticketsInStock }, (_, i) => 1 + i).map((ticketsAmount) => (
    <option key={"select" + ticketsAmount} value={ticketsAmount}>
      {ticketsAmount}
    </option>
  ));

  useEffect(() => {
    setTicketsInStock(showData?.ticketsIds.length);
  }, [isLoading, showData]);

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger">{error.data.message || error.error}</Message>
  ) : showData ? (
    <Row>
      <Col md={5}>
        <ListGroup>
          <ListGroup.Item>
            <Link className="btn btn-light" to="/home">
              Go back
            </Link>
          </ListGroup.Item>
          <ListGroup.Item>
            <Image src={showData.image} alt={showData.name} fluid />
          </ListGroup.Item>

          <ListGroup.Item>
            {showData.date.toString()} {showData.time} {showData.duration}min
          </ListGroup.Item>
          <ListGroup.Item>{showData.cast}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={4}>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <h3>{showData.name}</h3>
          </ListGroup.Item>
          <ListGroup.Item>
            <Rating rate={showData.rate} />
          </ListGroup.Item>
          <ListGroup.Item>Price: {showData.price}ILS</ListGroup.Item>
          <ListGroup.Item>{showData.description}</ListGroup.Item>
        </ListGroup>
      </Col>
      <Col md={3}>
        <ListGroup>
          <ListGroup.Item>
            <Row>
              <Col>Price:</Col>
              <Col>
                <strong>&#8362;{showData.price}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col>Tickets:</Col>
              <Col>
                <strong>{ticketsInStock}</strong>
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col className="w-100">
                <Button onClick={addToCartHandler} type="button" disabled={ticketsInStock === 0}>
                  Buy now
                </Button>
              </Col>
              {ticketsInStock > 0 && (
                <Col className="d-flex justify-content-end">
                  <Form.Control as="select" value={chosenTicketsAmount} onChange={handleTicketsSelect}>
                    {dynamicOptions}
                  </Form.Control>
                </Col>
              )}
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  ) : (
    <Message variant="danger">Data error</Message>
  );
};

export default Product;
