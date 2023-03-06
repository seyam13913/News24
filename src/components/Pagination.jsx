import React, { Component } from "react";

export default class Pagination extends Component {
  state = {
    isEditable: false,
  };
  render() {
    const { currentPage, totalPage, next, prev, handlePageChange, goToPage } =
      this.props;

    return (
      <div className="d-flex my-5 align-items-center">
        <button
          className="btn btn-warning"
          disabled={!(currentPage > 1)}
          onClick={() => {
            prev();
          }}
        >
          &#8592; Previous
        </button>
        <div className="flex-grow-1 text-center">
          {this.state.isEditable ? (
            <input
              type="number"
              value={currentPage}
              onChange={(e) => handlePageChange(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  goToPage();
                  this.setState({
                    isEditable: false,
                  });
                }
              }}
            />
          ) : (
            <p
              style={{
                userSelect: "none",
                lineHeight: "1.1",
              }}
              title="Double tap to jump page"
              onDoubleClick={() => {
                this.setState({
                  isEditable: !this.state.isEditable,
                });
              }}
            >
              {currentPage} of {totalPage}
              <br />
              <small>Double tap to edit</small>
            </p>
          )}
        </div>
        <button
          className="btn btn-warning ml-auto"
          disabled={!(currentPage < totalPage)}
          onClick={() => {
            next();
          }}
        >
          Next &#8594;
        </button>
      </div>
    );
  }
}
