import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import '../stylesheets/pensPaginationHome.css'
export default function PaginatedPensHome(props:any) {
    const {data}=props;
  const [currentItems, setCurrentItems] = useState<any>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;
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
    <div className='pens'>
        {currentItems.map((pen:any)=>{
            return(
                <div>
                    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={pen.url} />
      <Card.Body>
        <Card.Title>{pen.name}</Card.Title>
        <Card.Text>
         Category: {pen.category}
          Price:<p style={{color:"green"}}>{pen.price}$</p>
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
        pageLinkClassName="page-rum"
        previousLinkClassName='page-num'
        nextLinkClassName='page-num'
        activeLinkClassName='active'
      />
      </div>
      </div>
    </>
  );
}