import { Row, Card, Stack } from 'react-bootstrap';
import { CiLocationOn, CiClock2 } from "react-icons/ci";

const ShowCard = ({ show }: any) => {
	return (
		<>
			<Card className='my-2 p-3'>
				<Card.Img src={show.image} />
				<Card.ImgOverlay className='d-flex align-items-end justify-content-end'>
					<div>
						Save {show.price - 13}%
					</div>
				</Card.ImgOverlay>

				<Card.Footer>
					<Row>
						<Stack direction="horizontal">
							{show.name}
							<div className='ms-auto'>
								{show.price}.00 <span>ILS</span>
							</div>
						</Stack>
					</Row>
					<Row>
						<Stack direction="horizontal" gap={1}>
							<CiLocationOn />
							{show.address}
						</Stack>
					</Row>
					<Row>
						<Stack direction="horizontal" gap={1}>
							<CiClock2 />
							{show.time}
						</Stack>
					</Row>
				</Card.Footer>
			</Card>
		</>
	);
};

export default ShowCard;