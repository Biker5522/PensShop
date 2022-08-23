import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { Row, Col, FormGroup, Form, Button } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
export const PenAddPage = () => {
	const [ name, setName ] = useState('');
	const [ category, setCategory ] = useState('');
	const [ price, setPrice ] = useState('');
	const [ url, setUrl ] = useState('');
	const [ errorMsg, setError ] = useState('');

	//Get token from cookies
	const [ cookies, setCookie, removeCookie ] = useCookies([ 'token' ]);
	let token = cookies.token;

	const headers = {
		'Content-Type': 'application/json',
		token: token
	};

	let navigate = useNavigate();
	const SubmitHandler = async (e: SyntheticEvent) => {
		e.preventDefault();
		//Api connect POST User
		await axios
			.post(
				'/pens',
				{
					name: name,
					category: category,
					price: price,
					url: url
				},
				{ headers: headers }
			)
			.catch((error) => {
				if (error.response) {
					console.log(error);
					setError(error.response.data);
				}
			});
	};
	return (
		<div className="">
			<Row>
				<Col sm={2} />
				<Col sm={8} className="CardMain">
					<div className="Card">
						<h2>Add Position</h2>
						<h5 className="AlertDanger">{errorMsg}</h5>
						<Form onSubmit={SubmitHandler}>
							<Form.Group>
								<Form.Label>Product</Form.Label>
								<label>Name</label>
								<Form.Control
									type="text"
									placeholder="Enter name"
									value={name}
									onChange={(e: any) => setName(e.target.value)}
								/>
								<label>Category</label>
								<Form.Select
									aria-label="Default select example"
									onChange={(e: any) => setCategory(e.target.value)}
									value={category}
								>
									<option>Open this to choose</option>
									<option value="Fountain">Fountain Pen</option>
									<option value="Ballpoint">Ballpoint</option>
									<option value="Gel-Pen">Gel Pen</option>
								</Form.Select>

								<label>Price</label>
								<Form.Control
									type="number"
									placeholder="Enter Price"
									value={price}
									onChange={(e: any) => setPrice(e.target.value)}
								/>
							</Form.Group>
							<label>Image</label>
							<Form.Control
								type="text"
								placeholder="Enter url"
								value={url}
								onChange={(e: any) => setUrl(e.target.value)}
							/>
							<div className="pt-3">
								<Button type="submit" variant="success">
									Submit
								</Button>
								<Link to="/Menu/List" className="btn btn-danger ml-2">
									Cancel
								</Link>
							</div>
						</Form>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
