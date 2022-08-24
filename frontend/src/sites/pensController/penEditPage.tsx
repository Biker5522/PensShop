import axios from 'axios';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const PenEditPage = () => {
	let [ name, setName ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ url, setUrl ] = useState('');
	const [ price, setPrice ] = useState('');
	const { id } = useParams();
	const [ errorMsg, setError ] = useState('');

	//Get token from cookies
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'token' ]);
	let token = cookies.token;

	const headers = {
		'Content-Type': 'application/json',
		token: token
	};

	useEffect(() => {
		axios(`/pens/${id}`, { headers }).then((res: any) => {
			setName(res.data.name);
			setCategory(res.data.category);
			setUrl(res.data.url);
			setPrice(res.data.price);
		});
	}, []);

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();

		//Api connect POST User
		await axios
			.put(`/pens/${id}`, {
				name: name,
				category: category,
				price: price,
				url: url
			})
			.catch((error) => {
				if (error.response) {
					setError(error.response.data.result);
				}
			});
		navigate('/pens/list');
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />

				<Col sm={8} className="addCard">
					<div className="Card">
						<Form onSubmit={SubmitHandler}>
							<h2>Edit Product</h2>
							<h5 className="alert-danger">{errorMsg}</h5>
							<Form.Group>
								<Form.Label>Name</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e: any) => setName(e.target.value)}
								/>
								<Form.Label>Category</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter category"
									value={category}
									onChange={(e: any) => setCategory(e.target.value)}
								/>
								<Form.Label>Price</Form.Label>
								<Form.Control
									type="number"
									placeholder="Enter Price"
									value={price}
									onChange={(e: any) => setPrice(e.target.value)}
								/>
								<Form.Label>Image</Form.Label>
								<Form.Control
									type="text"
									placeholder="Enter Url"
									value={url}
									onChange={(e: any) => setUrl(e.target.value)}
								/>
							</Form.Group>
							<Button type="submit" variant="success">
								Submit
							</Button>
							<Link to="/Menu/List" className="btn btn-danger ml-2">
								Cancel
							</Link>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
