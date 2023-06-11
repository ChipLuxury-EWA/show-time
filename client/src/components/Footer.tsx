import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import MenuButton from './MenuButton';

const Footer = () => {
	const navigate = useNavigate();

	const handleOnSelect = (eventKey: string) => {
		navigate(`/${eventKey}`);
		console.log(`pressed ${eventKey}`);
	};

	return (
		<footer>
			<Navbar fixed="bottom" bg="light" variant="light">
				<Container fluid>
					<Nav className="vw-100" fill defaultActiveKey="home" onSelect={(eventKey) => {
						handleOnSelect(eventKey!);
					}}>
						<MenuButton menuItemType={"home"} />
						<MenuButton menuItemType={"inbox"} />
						<MenuButton menuItemType={"myShows"} />
						<MenuButton menuItemType={"profile"} />
					</Nav>
				</Container>
			</Navbar>
		</footer>
	);
};

export default Footer;