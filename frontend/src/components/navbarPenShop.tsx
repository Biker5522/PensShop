import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import { Home } from '../sites/homePage';

function NavbarPenShop() {
	return (
		<Router>
			<div className="Navbar">
				<Navbar variant="light" expand="lg">
					<Container>
						<Navbar.Brand href="#home">PenShop</Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Navbar.Collapse id="basic-navbar-nav">
							<Nav className="me-auto">
								<Nav.Link as={Link} to={'/'}>
									Home
								</Nav.Link>
								<NavDropdown title="Pens CRUD" id="basic-nav-dropdown">
									<NavDropdown.Item as={Link} to={'/Pens/List'}>
										Employees List
									</NavDropdown.Item>
									<NavDropdown.Item as={Link} to={'/Pens/Add'}>
										Add Employee
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
							<Nav>
								<Nav.Link as={Link} to={'/Login'}>
									Login
								</Nav.Link>
								<Nav.Link as={Link} to={'/Register'}>
									Register
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Container>
				</Navbar>
			</div>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
		</Router>
	);
}
export default NavbarPenShop;
