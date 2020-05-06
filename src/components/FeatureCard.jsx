import React from "react";
import { truncateString, ratingPercent } from "../helpers/helper";
import { Button } from "./common/Button";
import { Backdrop } from "./common/Backdrop";

export const FeatureCard = ({ feature }) => {
  return (
    <Backdrop backdrop={feature.backdrop} type="feature">
      <section className="section">
        <div className="hero">
          <div className="hero-info">
            <h2 className="media-title">{truncateString(feature.name, 50)}</h2>
            <div className="group" style={{ display: "flex" }}>
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
    </Backdrop>
  );
};
