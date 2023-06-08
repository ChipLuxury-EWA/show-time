import { Row, Col, Card, Container } from 'react-bootstrap';

const ShowCard = ({ show }: any) => {
	return (
		<>
			{/* <Row>{show.image}</Row>
			<Row>
				<Col>{show.name}</Col>
				<Col>{show.price} <span>ILS</span></Col>
			</Row>
			<Row>{show.address}</Row>
			<Row>{show.time}</Row> */}
			<Card className='my-2 p-3'>
				<Card.Img src={show.image}/>

				<Card.Footer>
					<Container>
						<Row>
							<Col>{show.name}</Col>
							<Col>{show.price}.00 <span>ILS</span></Col>
						</Row>
						<Row>{show.address}</Row>
						<Row>{show.time}</Row>
					</Container>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ShowCard;