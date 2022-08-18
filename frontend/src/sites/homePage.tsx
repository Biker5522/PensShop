import React from 'react';
import { Row, Col, Card, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../stylesheets/home.css';
export const HomePage = () => {
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
									<Card.Title>Now you !</Card.Title>
									<Link to="/Order/Online" className="btn btn-success ml-2">
										Order
									</Link>
								</Card.Body>
							</Card>
						</div>

						{/* Discount Card */}
						<div className="DiscountCard item2 ">
							<Card>
								<Card.Img variant="top" className="Discount" />
								<Card.Body>
									<Card.Title>Check </Card.Title>
									<Link to="/Menu" className="btn btn-success ml-2">
										Go
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
