import React from "react";
import { VerticalList } from "./common/VerticalList";
import { SimilarCard } from "./cards/SimilarCard";
import { SeasonCard } from "./cards/SeasonCard";
import { CastList } from "./CastList";

export const ExtraInfo = ({ data, type }) => {
  const sectionClass = `section ${
    data.seasons && data.similar.length && "flex"
  }`;
  return (
    <React.Fragment>
      <CastList cast={data.cast} />
      <div className="root">
        <section className={sectionClass}>
          {renderSeasons(data)}
          {renderSimilar(data, type)}
        </section>
      </div>
    </React.Fragment>
  );
};

const renderSeasons = ({ seasons }) => {
  if (!seasons) return null;
  return (
    <section className="section">
      <h3 className="section-title">Seasons</h3>
      <VerticalList data={seasons} component={SeasonCard} />
    </section>
  );
};

const renderSimilar = (data, type) => {
  if (!data.similar.length) return null;
  const header = type === "movie" ? "Movies" : "Shows";
  return (
    <section className="section">
      <h3 className="section-title">Similar {header}</h3>
      <VerticalList data={data.similar} component={SimilarCard} type={type} />
    </section>
  );
};
