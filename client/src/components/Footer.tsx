import { Navbar, Nav, Container } from 'react-bootstrap';
import { CgHome, CgUser } from "react-icons/cg";
import { HiOutlineTicket } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
	const navigate = useNavigate()

	const handleOnSelect = (eventKey: string) => {
		navigate(`/${eventKey}`)
		console.log(`pressed ${eventKey}`);
	};

	return (
		<footer>
			<Navbar fixed="bottom" bg="light" variant="light">
				<Container fluid>
					<Nav className="justify-content-center" fill defaultActiveKey="home" onSelect={(eventKey) => {
						handleOnSelect(eventKey!);
					}}>
						<Nav.Item>
							<Nav.Link eventKey="home"><CgHome />Home</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="inbox"><HiOutlineEnvelope />Inbox</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="myShows"><HiOutlineTicket />My Shows</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="profile"><CgUser />Profile</Nav.Link>
						</Nav.Item>
					</Nav>
				</Container>
			</Navbar>
		</footer>
	);
};

export default Footer;