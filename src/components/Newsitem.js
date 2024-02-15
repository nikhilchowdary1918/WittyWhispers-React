import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description, ImageUrl, NewsUrl} = this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
            <img src={ImageUrl?ImageUrl:"https://www.livemint.com/lm-img/img/2024/02/05/1600x900/wireless_neckband_earphones_1707132485054_1707132511935.png"} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <a href={NewsUrl} target="_blank" className="btn btn-sm btn-dark" rel="noreferrer" >Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
