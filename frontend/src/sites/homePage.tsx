import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BannerPensShop from '../components/bannerPenShop';
import Pens from '../components/pensPaginationHome';
import '../stylesheets/home.css';
import axios from 'axios';
export const HomePage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);

	//Get pens from Menu
	useEffect(() => {
		axios('/pens').then((res) => {
			setBackendData(res.data.pens);
		});
	}, []);

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
