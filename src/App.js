import axios from "axios";
import React, { Component } from "react";
import News from "./api/apiCall";
import Header from "./components/Header";
import HeaderPagination from "./components/HeaderPagination";
import { newsCategory } from "./components/news";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";
import Spinner from "./components/spinner/Spinner";

const news = new News(newsCategory.entertainment);
export default class App extends Component {
  state = {
    data: {},
    isLoading: true,
  };

  changeCategory = (category) => {
    this.setState({ isLoading: true });
    news
      .changeCategory(category)
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
  };

  componentDidMount() {
    news
      .getNews()
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
  }

  next = () => {
    if (this.state.data.currentPage < this.state.data.totalPage) {
      this.setState({
        isLoading: true,
      });
    }
    news.next().then((data) => {
      this.setState({
        data: data,
        isLoading: false,
      }).catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
    });
  };

  previous = () => {
    if (this.state.data.currentPage > 1) {
      this.setState({
        isLoading: true,
      });
    }
    news.prev().then((data) => {
      this.setState({
        data: data,
        isLoading: false,
      }).catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
    });
  };

  handlePageChange = (value) => {
    this.setState({
      data: {
        ...this.state.data,
        currentPage: Number.parseInt(value),
      },
    });
  };

  goToPage = () => {
    this.setState({ isLoading: true });
    news
      .setCurrentPage(this.state.data.currentPage)
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
  };

  search = () => {
    this.setState({ isLoading: true });
    news
      .search(this.state.data.currentPage)
      .then((data) => {
        this.setState({
          data: data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
        alert("something is wrong");
        this.setState({
          isLoading: false,
        });
      });
  };

  render() {
    const { category, currentPage, totalPage, totalResults } = this.state.data;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6 offset-md-3">
            <Header
              category={category}
              changeCategory={this.changeCategory}
              search={this.search}
            />
            <HeaderPagination
              currentPage={currentPage}
              totalPage={totalPage}
              totalResults={totalResults}
            />
            {this.state.isLoading ? (
              <Spinner />
            ) : (
              <div>
                <NewsList news={this.state.data.articles} />
                <Pagination
                  next={this.next}
                  prev={this.previous}
                  currentPage={currentPage}
                  totalPage={totalPage}
                  totalResults={totalResults}
                  handlePageChange={this.handlePageChange}
                  goToPage={this.goToPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
