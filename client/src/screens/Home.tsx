import { Col, Row } from "react-bootstrap";
import ShowCard from "../components/ShowCard";

import dummyData from "../sandbox_data/dummyData";
import Header from "../components/Header";

const Home = () => {
  const showsDynamicList = dummyData.shows.map((show: any) => (
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
