import React from 'react'
import { Link } from 'react-router-dom'

export const ListCard = ({type, data}) => {

  return(
    <Link to={`/${type}/${data.id}`}>
      <div className="list-card">
        <div className="list-img">
          <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={`${data.name}` || `${data.title}` } />
        </div>
        {/* <div className="list-info">
          {data.title ? data.title : data.name}
        </div> */}
      </div>
    </Link>
  )
}