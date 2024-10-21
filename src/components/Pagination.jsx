// src/components/Pagination.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  setPage } from '../redux/store';


const Pagination = () => {

  const totalPages = 2

  const dispatch = useDispatch();
  const { currentPage } = useSelector((state) => state.emails);


  const onPageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <section className="pagination">

      <p>Pages :</p>
      <div className='paginaiton-buttons'>
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => onPageChange(idx + 1)}
            className={currentPage === idx + 1 ? 'active' : ''}
          >
            {idx + 1}
          </button>
        ))}
      </div>
     
    </section>
  );
};

export default Pagination;
