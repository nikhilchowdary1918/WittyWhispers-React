import React, { Component } from 'react';
import Newsitem from './Newsitem';
import Toast from './Toast';

export class News extends Component {

  constructor(){
    super()
    console.log("Hi i am a constructor");
    this.state ={
      articles: [],
      //loading:false,
      page:1,
      totalResults:0,
      showToast:false
    }
  }
  

  async componentDidMount(){
    let url="https://newsapi.org/v2/top-headlines?country=in&apiKey=7d04245bd9624ea0baa416d2bb181125&page=1&pagesize=20";
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData)
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  handlePrevClick=async()=>{
    console.log("Previous")
    let url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=7d04245bd9624ea0baa416d2bb181125&page=${this.state.page - 1}&pagesize=20`;
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData)

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })  

  }
  handleNextClick=async()=>{
    console.log("Next")
    if(this.state.page + 1> Math.ceil(this.state.totalResults/20)){
      console.log("Im in IF")
      this.setState({ showToast: true });
    }
    else{
    let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=7d04245bd9624ea0baa416d2bb181125&page=${this.state.page + 1}&pagesize=20`;
    let data= await fetch(url);
    let parsedData= await data.json();
    console.log(parsedData)

    this.setState({
      page: this.state.page + 1,
      articles: parsedData.articles
    })
  }  
  }

  render() {
    return (
      <div className='container my-3'>
        <h1>WittyWhispers - Top Headlines</h1>
        {this.state.showToast && <Toast />} 
        <div className='row'>
        {this.state.articles.map((element)=>{
          return<div className='col-md-4' key={element.url}>  
                <Newsitem title={element.title?element.title:""} description={element.description?element.description:" "} ImageUrl={element.urlToImage}
                NewsUrl={element.url}/>
              </div>
        })}
        </div>
        <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
        <button type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

        </div>
      </div>
    )
  }
}

export default News
