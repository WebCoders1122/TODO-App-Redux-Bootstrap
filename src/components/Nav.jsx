import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Pagination from "react-bootstrap/Pagination";
import { connect } from "react-redux";

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

const mapStateToProps = (state) => {
  return {
    currentPage: state.currentPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    nextPage: () => {
      dispatch({ type: "NEXT" });
    },
    previousPage: () => {
      dispatch({ type: "PREV" });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
