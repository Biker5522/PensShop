import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BannerPensShop from '../components/bannerPenShop';
import Pens from '../components/pensPaginationHome'
import '../stylesheets/home.css';
import axios from 'axios';
export const HomePage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	let [ filteredData, setFilteredData ] = useState<any>([]);
	const [ name, setName ] = useState('All');
	const [ category, setCategory ] = useState('All');
	const [ price, setPrice ] = useState('All');
	//Get pens from Menu
	useEffect(() => {
		axios('/pens').then((res) => {
			setBackendData(res.data.pens);
		});
		
	}, []);
	
	 useEffect(() => {
		console.log(backendData);
		 if(category==='All'){
			backendData.map(function(pen:any) {filteredData.push(pen)});
			console.log(filteredData);
		 }
		 else{
		 filteredData=[];
		 backendData.map(function(pen:any) {if(pen.category==category)filteredData.push(pen)});
		 }
	}, [category]); 
	

	return (
		<div className="Main">
			<Row className="m-0 p-0">
				<Col sm={1} />
				<Col sm={10} className="MainRow">
					<BannerPensShop/>
					<div className="Products">
						<div className="FilterBar">
						<Form /* onSubmit={SubmitHandler} */>
								{/* Email Form */}
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="name"
										placeholder="Enter Name"
										 value= {name}  
										onChange={(e: any) => setName(e.target.value)} 
									/>
								</Form.Group>
								<Form.Select
									onChange={(e: any) => setCategory(e.target.value)}
									value={category} >
									<option value='All'>Open this to choose</option>
									<option value="Fountain">Fountain Pen</option>
									<option value="Ballpoint">Ballpoint</option>
									<option value="Gel-Pen">Gel Pen</option>
								</Form.Select>
								</Form>
						</div>
					<Pens data={backendData} />
					</div>
				</Col>
				<Col sm={1} />
			</Row>
		</div>
	);
};
