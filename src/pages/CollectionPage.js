import React, { useState , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { fetchCollections } from '../api/functions'
import { ratingPercent } from '../helpers/helper'
import { Image } from '../components/Image'
import { Button } from '../components/Button'

export const CollectionPage = () => {
  const id = useParams()
  const [collection, setCollection] = useState(null)

  useEffect(() => {
    fetchCollections(id.collectionId).then(response => {
      setCollection(response)
    })
  }, [id])
  if(!collection) return null
  return (
    <React.Fragment>
      <div className="root" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${collection.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
        <div className="gradient-bg">
          <section className="section flex hero">
            <div className="hero-media">
              <Image hero rounded src={collection.poster} alt={collection.name} />
            </div>
            <div className="hero-info">
              <h2 className="media-title">{collection.name}</h2>
              <div className="group">
                <h4 className="sub-title">Overview</h4>
                <p className="overview">
                  {collection.overview}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
      {collection.parts.map(movie => (
        <div className="root" key={movie.id} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${movie.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
          <div className="gradient-bg">
            <section className="section flex hero">
              <div className="hero-info">
                <h2 className="media-title">{movie.name}</h2>
                <div className="group" style={{display: 'flex'}}>
                  <div className="sub-group">
                    <div className="sub-title">Rating</div>
                    <div>{ratingPercent(movie.rating)}</div>
                  </div>
                  <div className="sub-group">
                    <div className="sub-title">Release Date</div>
                    <time dateTime={movie.released}>{movie.released}</time>
                  </div>
                </div>
                <div className="group">
                  <div className="sub-title">Overview</div>
                  <p className="overview">
                    {movie.overview}
                  </p>
                </div>
                <div className="group">
                  <Button link={`/movie/${movie.id}`}>
                      Learn More
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      ))}
    </React.Fragment>
  )
}