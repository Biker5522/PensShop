import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, ListGroupItem } from 'react-bootstrap';
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
			.delete(`/pens/${_id}`)
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
        {currentItems.map((pen:any)=>{
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