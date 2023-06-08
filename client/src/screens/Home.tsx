import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import ShowCard from "../components/ShowCard";

const dummyData = require('../sandbox_data/dummyData');

const Home = () => {
  const [sbData, setSbData] = useState(dummyData);

  const showsDynamicList = sbData.shows.map((show: any) => (
    <Row key={show._id}>
      <ShowCard show={show} />
    </Row>
  ));

  return (
    <>
      <Col>{showsDynamicList}</Col>
    </>
  );
};

export default Home;