import React from "react";

const NewsList = ({ news }) => {
  function getDateString(dateTimeStr) {
    return new Date(dateTimeStr).toDateString();
  }

  const NewsItem = ({ item }) => (
    <div className="card mb-4">
      {item && (
        <img
          className="card-img-top"
          src={
            "https://i-invdn-com.investing.com/news/moved_LYNXMPEHAH0OR_L.jpg"
          }
          alt={item.title}
        />
      )}
      <div className="card-body">
        <a
          href={item.url}
          target="_blank"
          style={{ color: "#424242", textDecoration: "none" }}
        >
          <h5 className="card-title">{item.title}</h5>
        </a>
        <p style={{ color: "#424242" }}>
          <h5 className="card-title">{item.content}</h5>
        </p>
        <div className="mt-2 d-flex justify-content-between align-items-center">
          <small>
            <strong> published at {getDateString(item.publishedAt)}</strong>
          </small>
          <div
            className="ml-auto"
            style={{
              padding: ".25rem .5rem",
              background: "#ededed",
              color: "#424242",
              borderRadius: ".25rem",
              display: "inline-block",
            }}
          >
            <small>{item.source.name}</small>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {news &&
        news.length > 0 &&
        news.map((item) => <NewsItem key={item.title} item={item} />)}
    </div>
  );
};

export default NewsList;
