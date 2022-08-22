import { useEffect, useState } from 'react';
import { Row, Col, Button, ListGroupItem, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PensHeaderComponent } from './pensHeaderComponent';
import Pens from '../../components/pensPaginationCRUD';
import '../../stylesheets/pensPaginationCRUD.css'

import axios from 'axios';

export const PensListPage = () => {
	const [ backendData, setBackendData ] = useState<any>([]);
	//Get pens from Menu
	useEffect(() => {
		axios('/pens').then((res) => {
			setBackendData(res.data.pens);
			console.log(res.data);
		});
	}, []);

	return (
		<div className="">
			<Row>
				<Col sm={2} />
				<Col sm={8} className="MainRow">
					
						<div className="MenuCrudMain ">
							<PensHeaderComponent />
							<div>
					<Pens data={backendData} />
							{/* <ListGroup>
								{backendData.map((pen: any) => (
									<ListGroupItem>
										<div className="d-grid">
											<p>
												{pen.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
												<strong>{pen.category}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong>
												{pen.price}$
											</p>
											<div className="listButtons">
												<Link className="btn btn-warning  mr-1 " to={`../Menu/Edit/${pen._id}`}>
													Edit
												</Link>
												<Button
													className="btn btn-warning  mr-1 "
													onClick={() => removePen(pen._id)}
													variant="danger"
												>
													Delete
												</Button>
											</div>
										</div>
									</ListGroupItem>
								))}
							</ListGroup> */}
						</div>
					</div>
				</Col>

				<Col sm={2} />
			</Row>
		</div>
	);
};
