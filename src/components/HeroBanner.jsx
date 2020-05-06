import React from "react";
import { Image } from "./common/Image";
import { Backdrop } from "./common/Backdrop";

export const HeroBanner = ({ data, children }) => {
  return (
    <Backdrop backdrop={data.backdrop}>
      <section className="section flex hero">
        <div className="hero-media">
          <Image
            hero
            rounded
            type="large_poster"
            src={data.poster || data.image}
            alt={data.name}
          />
        </div>
        {children}
      </section>
    </Backdrop>
  );
};
