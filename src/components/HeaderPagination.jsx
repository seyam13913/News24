import React, { Component } from "react";

export default class HeaderPagination extends Component {
  render() {
    const { currentPage, totalPage, totalResults } = this.props;
    return (
      <div className="d-flex justify-content-between align-items-center">
        <p className="text-black-50">About {totalResults} result found</p>
        <p className="text-black-50 ml-auto">
          {currentPage} page of {totalPage}
        </p>
      </div>
    );
  }
}
