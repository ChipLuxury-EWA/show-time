import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import ShowCard from "../components/ShowCard";
import Header from "../components/Header";
import { fetchShows } from "../services/show.service";

interface show {
  _id: string;
}

const Home = () => {
  // TODO tompo change state to redux when implement redux
  const [shows, setShows] = useState<show[]>([]);
  useEffect(() => {
    initializeShows();
  }, []);

  const initializeShows = async () => {
    setShows(await fetchShows());
  };

  const showsDynamicList = shows.map((show: show) => (
    <Row key={show._id}>
      <ShowCard show={show} />
    </Row>
  ));

  return (
    <>
      <Header />
      <Col>{showsDynamicList}</Col>
    </>
  );
};

export default Home;
