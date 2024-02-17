import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
//import Toast from './Toast';
import PropTypes from "prop-types";
;

export class News extends Component {
  static defaultProps = {
    pagesize: 6,
    country: "in",
    category: "general",
  };
  static propTypes = {
    pagesize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("Hi i am a constructor");
    this.state = {
      articles: [],
      Rocket: false,
      page: 1,
      totalResults: 0,
      Toast: false,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - WhittyWhispers`;
  }
  async newsUpdate() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=7d04245bd9624ea0baa416d2bb181125&page=${this.state.page}&pagesize=${this.props.pagesize}`;
    this.setState({ Rocket: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      Rocket: false,
    });
  }
  handleNextClick hi
  async componentDidMount() {
    this.newsUpdate();
  }

   handlePrevClick = async () => {
     this.setState({ page: this.state.page - 1 });
     this.newsUpdate();
   };
   handleNextClick = async () => {
     this.setState({ page: this.state.page + 1 });
     this.newsUpdate();
   };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "35px" }}>
          WittyWhispers - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines{" "}
        </h1>
        {this.state.Rocket && <Spinner/>}
        <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title ? element.title : ""} description={element.description ? element.description : ""} ImageUrl={element.urlToImage} NewsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
        </div>
        
    );
  }
}

export default News;
