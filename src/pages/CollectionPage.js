import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCollections } from "../api/functions";
import { ratingPercent } from "../helpers/helper";
import { Image } from "../components/common/Image";
import { Button } from "../components/common/Button";
import { Backdrop } from "../components/common/Backdrop";

export const CollectionPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState();

  useEffect(() => {
    fetchCollections(collectionId).then((response) => {
      setCollection(response);
    });
  }, [collectionId]);
  if (!collection) return null;
  return (
    <React.Fragment>
      <Backdrop backdrop={collection.backdrop}>
        <section className="section flex hero">
          <div className="hero-media">
            <Image
              hero
              rounded
              type="large_poster"
              src={collection.poster}
              alt={collection.name}
            />
          </div>
          <div className="hero-info">
            <h2 className="media-title">{collection.name}</h2>
            <div className="group">
              <h4 className="sub-title">Overview</h4>
              <p className="overview">{collection.overview}</p>
            </div>
          </div>
        </section>
      </Backdrop>
      {collection.parts.map((movie) => (
        <Backdrop backdrop={movie.backdrop} type="feature">
          <section className="section flex hero">
            <div className="hero-info">
              <h2 className="media-title">{movie.name}</h2>
              <div className="group" style={{ display: "flex" }}>
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
                <p className="overview">{movie.overview}</p>
              </div>
              <div className="group">
                <Button link={`/movie/${movie.id}`}>Learn More</Button>
              </div>
            </div>
          </section>
        </Backdrop>
      ))}
    </React.Fragment>
  );
};
