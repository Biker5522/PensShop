import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BannerPensShop from '../components/bannerPenShop';
import Pens from '../components/pensPaginationHome';
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

	useEffect(
		() => {
			console.log('backendData');
			console.log(backendData);
			if (category === 'All') {
				filteredData = [];
				backendData.map(function(pen: any) {
					filteredData.push(pen);
				});
				console.log('Filtered');
				console.log(filteredData);
			} else {
				filteredData = [];
				backendData.map(function(pen: any) {
					if (pen.category == category) filteredData.push(pen);
				});
				console.log('Filtered');
				console.log(filteredData);
			}
		},
		[ category, backendData ]
	);

	return (
		<div className="Main">
			<Row className="m-0 p-0">
				<Col sm={1} />
				<Col sm={10} className="MainRow">
					<BannerPensShop />
					<div className="Products">
						<Pens data={backendData} />
					</div>
				</Col>
				<Col sm={1} />
			</Row>
		</div>
	);
};
