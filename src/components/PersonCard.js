import React from 'react'

export const PersonCard = ({ person }) => {

  return(
    <div className="person-card">
      <div className="person-img">
      {person.profile_path ? 
      <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt={person.name} /> 
      : 
      <img src={`https://via.placeholder.com/500x750.png?text=${person.name}`} alt={person.name} />}
        
      </div>
      {person.name}
    </div>
  )
}