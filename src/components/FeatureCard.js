import React from 'react'
import { truncateString, ratingPercent } from '../helpers/helper'
import { Button } from './Button'

export const FeatureCard = ({ feature }) => {
  return (
    <div className="root feature" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${feature.backdrop})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}>
      <div className="gradient-bg" >
        <section className="section">
          <div className="hero">    
              <div className="hero-info">
                <h2 className="media-title">{truncateString(feature.name, 50)}</h2>
                <div className="group" style={{display: 'flex'}}>
                  <div className="sub-group">
                    <div className="sub-title">Rating</div>
                    <div>{ratingPercent(feature.rating)}</div>
                  </div>
                  <div className="sub-group">
                    <div className="sub-title">Release Date</div>
                    <time dateTime={feature.released}>{feature.released}</time>
                  </div>
                </div>
                <div className="group">
                  <div className="sub-title">Overview</div>
                  <p className="overview">
                    {truncateString(feature.overview, 200)}
                  </p>
                </div>
                <div className="group">
                  <Button link={`/${feature.type}/${feature.id}`}>
                    Learn More
                  </Button>
                </div>
              </div>
          </div>
        </section>

      </div>
    </div>
  )
}