import React from 'react'
import { Image } from './Image'
import { Link } from 'react-router-dom'

export const CastList = ({cast}) => {
  if(!cast) return null
  return (
    <ul className="grid-shelf">
      {cast.map(credit => <Card credit={credit} key={credit.id} />)}
    </ul>
  )
}

const Card = ({ credit }) => {
  return (
    <li className="grid-item">
      <Link to={`/person/${credit.id}`}>
        <Image rounded src={credit.profile_path || credit.poster_path} alt={credit.name || credit.title} />
        <div className="card-info">
          <div className="person-name">{credit.name}</div>
          <div className="character-name">{credit.character}</div>
        </div>
      </Link>
    </li>
  )
}