import apiLink from "../utils/axios";

const MAX_ITEM_PER_PAGE = 10;

export default class News {
  constructor(category) {
    (this._category = category),
      (this._searchTerm = ""),
      (this._pageSize = MAX_ITEM_PER_PAGE),
      (this._currentPage = 1),
      (this._totalPage = 1);
  }

  async getNews() {
    try {
      const { data } = await apiLink.get(this._getUrl());
      this._totalPage = Math.ceil(data.totalResults / this._pageSize);
      return {
        articles: data.articles,
        totalPage: this._totalPage,
        currentPage: this._currentPage,
        category: this._category,
        totalResults: data.totalResults,
      };
    } catch (error) {
      console.log(error?.res.data);
    }
  }

  next() {
    if (this._currentPage < this._totalPage) {
      this._currentPage++;
      return this.getNews();
    } else {
      return false;
    }
  }

  prev() {
    if (this._currentPage > 1) {
      this._currentPage--;
      return this.getNews();
    } else {
      return false;
    }
  }

  setCurrentPage(pageNumber) {
    if (pageNumber < 1 && pageNumber > this.totalPage) {
      console.log("Invalid page number!");
    }
    this._currentPage = pageNumber;
    return this.getNews();
  }

  changeCategory(category) {
    this._category = category;
    this._currentPage = 1;
    return this.getNews();
  }

  search(term) {
    this._searchTerm = term;
    return this.getNews();
  }

  _getUrl() {
    let url = "/?";
    if (this._category) {
      url += `category=${this._category}`;
    }
    if (this._searchTerm) {
      url += `&q=${this._searchTerm}`;
    }
    if (this._pageSize) {
      url += `&pageSize=${this._pageSize}`;
    }
    if (this._currentPage) {
      url += `&page=${this._currentPage}`;
    }

    return url;
  }
}
