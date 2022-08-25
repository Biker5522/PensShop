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
const [ show, setShow ] = useState(false);
  const [ category, setCategory ] = useState('');
  const [ name, setName ] = useState('');
  const [ minPrice, setMinPrice ] = useState(0);
  const [ maxPrice, setMaxPrice ] = useState(999);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    //Filter Current items
    setCurrentItems(data.filter((pen:any)=> pen.category.includes(category)).filter((pen:any)=> pen.name.toLowerCase().includes(name.toLowerCase()))
    .filter((pen:any)=> (pen.price >=minPrice)).filter((pen:any)=> (pen.price <=maxPrice)).slice(itemOffset, endOffset));
    //Filter Items and set page count
    setPageCount(Math.ceil(data.filter((pen:any)=> pen.category.includes(category)).filter((pen:any)=> pen.name.toLowerCase().includes(name.toLowerCase()))
    .filter((pen:any)=> (pen.price >=minPrice)).filter((pen:any)=> (pen.price <=maxPrice)).length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data,category,name, maxPrice,minPrice ]);

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
    <div className='FilterBar'>
      <div className='FilterButton' onClick={()=>{if(show==false){setShow(true)}
      else {
        setShow(false);
        setCategory('');
        setName('');
        setMaxPrice(999);
        setMinPrice(0);

      }
      }}>
        <img src="https://www.freeiconspng.com/thumbs/filter-icon/filter-icon-0.png"></img>
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
            
    <div className='pens'>
        {currentItems.map((pen:any)=>{
            return(
                <div>
                    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pen.url} />
      <Card.Body>
        <Card.Title style={{fontStyle:"italic"}}><strong>{pen.name}</strong></Card.Title>
        <Card.Text>
         Category: {pen.category}
          <p style={{color:"green",fontSize:"1.5rem"}}>{pen.price}$</p>
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