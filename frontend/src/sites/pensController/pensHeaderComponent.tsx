import React from 'react';
import { Navbar, Container, NavbarBrand, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const PensHeaderComponent = () => {
	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<NavbarBrand href="/">Products</NavbarBrand>
				<Nav>
					<NavItem>
						<Link className="btn btn-primary" to="../Pens/add">
							Add Product
						</Link>
					</NavItem>
				</Nav>
			</Container>
		</Navbar>
	);
};
