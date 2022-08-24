import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useCookies } from 'react-cookie';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import '../stylesheets/pensPaginationCRUD.css'

export default function PaginatedPens(props:any) {
    const {data}=props;
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
  //Filter
const [ show, setShow ] = useState(false);
const [ category, setCategory ] = useState('');
const [ name, setName ] = useState('');
const [ minPrice, setMinPrice ] = useState(0);
const [ maxPrice, setMaxPrice ] = useState(999);

//Get token from cookies
const [ cookies,  ] = useCookies([ 'token' ]);
let token = cookies.token;

const headers = {
  'Content-Type': 'application/json',
  token: token
};
  
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,data ]);

  //Delete Product
	const removePen = (_id: any) => {
		let id: String = _id;
		axios
			.delete(`/pens/${_id}`, {headers})
			.then(function(response) {
				window.location.reload();
			})
			.catch(function(error) {
				console.log(error);
			});
	};

  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className='pensCRUD'>
    <div className='FilterBar' style={{border:"1px solid rgba(92, 92, 92, 0.384)"}}>
      <div className='filterButton mt-1' onClick={()=>{if(show==false){setShow(true)}
      else {
        setShow(false);
        setCategory('');
        setName('');
        setMaxPrice(999);
        setMinPrice(0);

      }
      }}>
        <img style={{border:"0px solid white"}} src="https://www.freeiconspng.com/thumbs/filter-icon/filter-icon-0.png"></img>
      <div><p>Filter</p></div>
      </div>
						{	show?<Form>
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Search</Form.Label>
									<Form.Control
										type="name"
										placeholder="Search"
										 value={name} 
										onChange={(e: any) => setName(e.target.value)} 
									/>
								</Form.Group>
                <div>
                <Form.Label>Category</Form.Label>
								<Form.Select  onChange={(e: any) => setCategory(e.target.value)} value={category} >
                
									<option value="">Open this to choose</option>
									<option value="Fountain">Fountain Pen</option>
									<option value="Ballpoint">Ballpoint</option>
									<option value="Gel-Pen">Gel Pen</option>
								</Form.Select>
              
</div>
                <Form.Group className="mb-3 priceForm" controlId="formBasicEmail">
									<Form.Label>Min Price</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter Min Value"
										 value={minPrice} 
										onChange={(e: any) => setMinPrice(e.target.value)} 
									/>
								</Form.Group>
                <Form.Group className="mb-3 priceForm" controlId="formBasicEmail">
									<Form.Label>Max Price</Form.Label>
									<Form.Control
										type="number"
										placeholder="Enter MaxValue"
										 value={maxPrice} 
										onChange={(e: any) => setMaxPrice(e.target.value)} 
									/>
								</Form.Group>
							</Form>:null}
						</div>
            {currentItems.filter((pen:any)=> pen.category.includes(category)).filter((pen:any)=> pen.name.toLowerCase().includes(name.toLowerCase()))
        .filter((pen:any)=> (pen.price >=minPrice)).filter((pen:any)=> (pen.price <=maxPrice)).map((pen:any)=>{
            return(
                <div>
                    <ListGroup>
									<ListGroupItem>
										<div className="d-grid">
											<p>
                      <img src={pen.url}></img>
                      <div className='description'>
												{pen.name}&nbsp;
												<strong>{pen.category}&nbsp; </strong>
												{pen.price}$
                        </div>
											</p>
                      
											<div className="listButtons">
												<Link className="btn btn-warning  mr-1 " to={`../pens/edit/${pen._id}`}>
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
								
							</ListGroup>
                </div>
                
            )
        })}
    </div>
      <ReactPaginate
        breakLabel=".."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        //renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
    </>
  );
}