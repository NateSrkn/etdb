import React, { useEffect } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import { FeatureCard } from './FeatureCard'
import { useSelector, useDispatch } from 'react-redux';
import { loadFeatured } from '../store/types/featured';

export const FeaturedHero = () => {
  const dispatch = useDispatch()
  const featured = useSelector(state => state.entities.featured.list)
  useEffect(() => {
    dispatch(loadFeatured())
  }, [dispatch])

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