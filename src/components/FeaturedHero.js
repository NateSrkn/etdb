import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import { FeatureCard } from './FeatureCard'
import { fetchTrending } from '../api/functions'

export const FeaturedHero = ({ type }) => {
  let [featured, setFeatured] = useState(null)

  useEffect(() => {
    fetchTrending(type).then(response => {
      setFeatured(response)
    })
  }, [type])

  let settings = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    className: 'featured-slider',
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true
  }
  if(!featured) return null
  return (
    <React.Fragment>
        <Slider {...settings}>
            {featured.map((feature, index) => <FeatureCard feature={feature} key={index} />)}
        </Slider>
    </React.Fragment>
  )
}