import { Col, Container, Row } from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Container fluid>
				<Col>
					<Row>Logo</Row>
					<Row>Search</Row>
					<Row>Category</Row>
				</Col>

			</Container>
		</header>
	);
};

export default Header;