import React, { useEffect, useState } from 'react'
import { call } from '../api/apiCall'
import { FETCH_TRENDING_ENDPOINT } from '../api/endpoints'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import { FeatureCard } from './FeatureCard'

export const FeaturedHero = ({ type }) => {
  let [featured, setFeatured] = useState(null)

  useEffect(() => {
    const fetchFeatured = async () => {
      let options = {
        base: {
          url: FETCH_TRENDING_ENDPOINT(type),
          method: 'get'
        }
      }

      const result = await call(options)
      setFeatured(result)
    }

    fetchFeatured()
  }, [type])

  let settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    className: 'featured-slider',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  if(!featured) return null
  return (
    <React.Fragment>
      <h3 style={{color: 'white'}}>Popular Now</h3>
      <Slider {...settings}>
          {featured.results.map((feature, index) => <FeatureCard feature={feature} key={index} />)}
      </Slider>
    </React.Fragment>
  )
}