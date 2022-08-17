import React from 'react';
import { Row, Col, Card, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export const Home = () => {
	return (
		<div className="Main">
			<Row className="m-0 p-0">
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					<div className="DiscountElements">
						{/* Discount Card */}
						<div className="DiscountCard item1 ">
							<Card>
								<Card.Img variant="top" className="Discount" />
								<Card.Body>
									<Card.Title>Now you can order online!</Card.Title>
									<Link to="/Order/Online" className="btn btn-success ml-2">
										Order Now!
									</Link>
								</Card.Body>
							</Card>
						</div>

						{/* Discount Card */}
						<div className="DiscountCard item2 ">
							<Card>
								<Card.Img variant="top" className="Discount" />
								<Card.Body>
									<Card.Title>Check Our Newest Pizzas</Card.Title>
									<Link to="/Menu" className="btn btn-success ml-2">
										Go to Menu
									</Link>
								</Card.Body>
							</Card>
						</div>
					</div>
				</Col>
				<Col sm={3} />
			</Row>
		</div>
	);
};
