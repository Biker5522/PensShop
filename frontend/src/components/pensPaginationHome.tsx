import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import '../stylesheets/pensPaginationHome.css'
export default function PaginatedPensHome(props:any) {
    const {data}=props;
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
//Filter
  const [ category, setCategory ] = useState('');

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,data ]);

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
    <div className="HomePensMain">
    <div className="FilterBar">
							<Form /* onSubmit={SubmitHandler} */>
								{/* Email Form */}
								<Form.Group className="mb-3" controlId="formBasicEmail">
									<Form.Label>Name</Form.Label>
									<Form.Control
										type="name"
										placeholder="Enter Name"
										/* value={name} */
										/* onChange={(e: any) => setName(e.target.value)} */
									/>
								</Form.Group>
								<Form.Select  onChange={(e: any) => setCategory(e.target.value)} value={category} >
									<option value="">Open this to choose</option>
									<option value="Fountain">Fountain Pen</option>
									<option value="Ballpoint">Ballpoint</option>
									<option value="Gel-Pen">Gel Pen</option>
								</Form.Select>
							</Form>
						</div>
    <div className='pens'>
    
        {currentItems.filter((penf:any)=> penf.category.includes(category)).map((pen:any)=>{
            return(
                <div>
                    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pen.url} />
      <Card.Body>
        <Card.Title style={{fontStyle:"italic"}}><strong>{pen.name}</strong></Card.Title>
        <Card.Text>
         Category: {pen.category}
          Price:<p style={{color:"green",fontSize:"1.5rem"}}>{pen.price}$</p>
        </Card.Text>
        <Button variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
                </div>
            )
        })}
    </div>
    <div className='paginationNumbers'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        //enderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
      </div>
      </div>
    </>
  );
}