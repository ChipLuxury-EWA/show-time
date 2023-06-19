import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import { fetchShowById } from "../services/show.service";
import { useEffect, useState } from "react";

interface show {
  _id: string;
  categoryId: number; // Assuming 4 categories available
  ticketIds: string[];
  sellerId: number; // Assuming 8 sellers available
  name: string;
  price: number; // Random price (10 to 100;
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

const Show = () => {
  const { id: showId }: any = useParams();

  const [show, setShow] = useState<show>({});
  const [ticketsAmount, setTicketsAmount] = useState<number>(0);

  useEffect(() => {
    const getShow = async () => {
      setShow(await fetchShowById(showId));
    };
    getShow();
  }, [showId]);

  setTicketsAmount(show?.ticketIds.length);

  return (
    <>
      <Row>
        <Col md={5}>
          <ListGroup>
            <ListGroup.Item>
              <Image src={show.image} alt={show.name} fluid />
            </ListGroup.Item>

            <ListGroup.Item>
              {show.date} {show.time} {show.duration}min
            </ListGroup.Item>
            <ListGroup.Item>{show.cast}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{show.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rate={show.rate} />
            </ListGroup.Item>
            <ListGroup.Item>Price: {show.price}ILS</ListGroup.Item>
            <ListGroup.Item>{show.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price:</Col>
                <Col>
                  <strong>&#8362;{show.price}</strong>
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
  );
};

export default Show;
