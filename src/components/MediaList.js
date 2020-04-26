import React from 'react'
import { Link } from 'react-router-dom'
import { Image } from './Image'

export const MediaList = ({ data, type }) => {

  const Card = ({data}) => {
    return(
      <li className="grid-item">
        <Link to={`/${type}/${data.id}`}>
          <Image rounded src={data.poster} alt={data.name} />
        </Link>
      </li>
    )
  }

  return (
    <div className="media-list">
      <h3 className="media-list-header">{type === "movie" ? "Movies" : "Shows"}</h3>
      <ul className="grid-shelf">
        {data.map(item => <Card  data={item} key={item.id} />)}
      </ul>
    </div>
  )
}
