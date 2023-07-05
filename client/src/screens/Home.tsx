import { Col, Row } from "react-bootstrap";

import ShowCard from "../components/ShowCard";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetAllShowsQuery } from "../redux/slices/shows.slice";

const Home = () => {
  const { data: shows, isLoading, isError, error } = useGetAllShowsQuery();

  const showsDynamicList = shows?.map((show) => (
    <Row key={show._id}>
      <ShowCard show={show} />
    </Row>
  ));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data.message || error.error}</Message> // TODO tompo ts: edit type ant of base query in line 6 api.slice.js
      ) : (
        <>
          <Header />
          <Col>{showsDynamicList}</Col>
        </>
      )}
    </>
  );
};

export default Home;
