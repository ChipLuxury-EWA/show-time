import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { fetchShowById } from "../services/show.service";
import { useEffect, useState } from "react";

interface Show {
  _id: string;
  categoryId: number;
  ticketIds: string[];
  sellerId: number;
  name: string;
  price: number;
  location: number;
  address: string;
  image: string;
  date: Date;
  time: number;
  minutesBeforePurchase: number;
  description: string;
  duration: number;
  cast: string[];
  rate: Number;
}

const Product = () => {
  const { id: showId } = useParams() as { id: string };
  const [showData, setShowData] = useState<Show | undefined>();
  const [ticketsAmount, setTicketsAmount] = useState<number>(0);

  useEffect(() => {
    const getShow = async () => {
      setShowData(await fetchShowById(showId));
    };
    getShow();
  }, [showId, setShowData]);

  useEffect(() => {
    showData && setTicketsAmount(showData.ticketIds.length);
  }, [showData]);

  return showData ? (
    <>
      <Row>
        <Col md={5}>
          <ListGroup>
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
                  <strong>{ticketsAmount}</strong>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={ticketsAmount === 0}
                  >
                    Buy now
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Link className="btn btn-light" to="/home">
                    Go back
                  </Link>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  ) : (
    <>Loading...</>
  );
};

export default Product;
