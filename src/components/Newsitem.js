import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description, ImageUrl, NewsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-dark" style={{left:'90%',zindex:1}}>
                  {source} <span className="visually-hidden">unread messages</span></span>
            <img src={ImageUrl?ImageUrl:"https://www.livemint.com/lm-img/img/2024/02/05/1600x900/wireless_neckband_earphones_1707132485054_1707132511935.png"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title" >{title}  </h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-body-secondary">By {author? author: "Unknown"} on {new Date(date).toGMTString()}</small></p>
                
                <a href={NewsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer" >Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
