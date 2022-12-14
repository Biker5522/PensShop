import 'bootstrap/dist/css/bootstrap.min.css';
import '../stylesheets/navbar.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { HomePage } from '../sites/homePage';
import { LoginPage } from '../sites/loginPage';
import { RegisterPage } from '../sites/registerPage';
import { PensListPage } from '../sites/pensController/pensListPage';
import { PenAddPage } from '../sites/pensController/penAddPage';
import { PenEditPage } from '../sites/pensController/penEditPage';

import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

function NavbarPenShop() {
	//Get token from cookies
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'token' ]);
	let token = cookies.token;

	//Logout
	function Logout() {
		removeCookie('token');
	}

	//Check is User Logged
	if (token != null) {
		//Decode JWT Token
		let decodedToken: any = jwt_decode(token);

		//Admin and
		if (decodedToken._role == 'admin' || decodedToken._role == 'moderator') {
			return (
				<Router>
					<div className="Navbar">
						<Navbar variant="light" expand="lg">
							<Container>
								<Navbar.Brand style={{ fontSize: '1.6rem', fontWeight: 'bold' }} href="#home">
									PenShop
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<Nav.Link as={Link} to={'/'}>
											Home
										</Nav.Link>
										<NavDropdown title="Pens CRUD" id="basic-nav-dropdown">
											<NavDropdown.Item as={Link} to={'/pens/list'}>
												Pens List
											</NavDropdown.Item>
											<NavDropdown.Item as={Link} to={'/pens/add'}>
												Add Pen
											</NavDropdown.Item>
										</NavDropdown>
									</Nav>
									<Nav>
										<Nav.Link as={Link} onClick={Logout} to={'/'}>
											Logout
										</Nav.Link>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/pens/list" element={<PensListPage />} />
						<Route path="/pens/add" element={<PenAddPage />} />
						<Route path="/pens/edit/:id" element={<PenEditPage />} />
					</Routes>
				</Router>
			);
		} else {
			//User
			return (
				<Router>
					<div className="Navbar">
						<Navbar variant="light" expand="lg">
							<Container>
								<Navbar.Brand style={{ fontSize: '1.6rem', fontWeight: 'bold' }} href="#home">
									PenShop
								</Navbar.Brand>
								<Navbar.Toggle aria-controls="basic-navbar-nav" />
								<Navbar.Collapse id="basic-navbar-nav">
									<Nav className="me-auto">
										<Nav.Link as={Link} to={'/'}>
											Home
										</Nav.Link>
									</Nav>
									<Nav>
										<Nav.Link as={Link} onClick={Logout} to={'/'}>
											Logout
										</Nav.Link>
									</Nav>
								</Navbar.Collapse>
							</Container>
						</Navbar>
					</div>
					<Routes>
						<Route path="/" element={<HomePage />} />
					</Routes>
				</Router>
			);
		}
	} else
		return (
			<Router>
				<div className="Navbar">
					<Navbar variant="light" expand="lg">
						<Container>
							<Navbar.Brand style={{ fontSize: '1.6rem', fontWeight: 'bold' }} href="#home">
								PenShop
							</Navbar.Brand>
							<Navbar.Toggle aria-controls="basic-navbar-nav" />
							<Navbar.Collapse id="basic-navbar-nav">
								<Nav className="me-auto">
									<Nav.Link as={Link} to={'/'}>
										Home
									</Nav.Link>
								</Nav>
								<Nav>
									<Nav.Link as={Link} to={'/login'}>
										Login
									</Nav.Link>
									<Nav.Link as={Link} to={'/register'}>
										Register
									</Nav.Link>
								</Nav>
							</Navbar.Collapse>
						</Container>
					</Navbar>
				</div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
				</Routes>
			</Router>
		);
}
export default NavbarPenShop;
