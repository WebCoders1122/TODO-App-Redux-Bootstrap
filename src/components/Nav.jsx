import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Pagination from "react-bootstrap/Pagination";

const Navigation = ({ previousPage, nextPage, currentPage }) => {
  return (
    <Pagination>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item onClick={() => previousPage()}>Previous</Pagination.Item>
      <Pagination.Item>{currentPage}</Pagination.Item>
      <Pagination.Item onClick={() => nextPage()}>Next</Pagination.Item>
      {/* <Pagination.Item active>{12}</Pagination.Item> */}
      {/* <Pagination.Item disabled>{14}</Pagination.Item>  */}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
};

export default Navigation;
