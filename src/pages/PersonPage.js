import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CreditsCard } from "../components/cards/CreditsCard";
import { VerticalList } from "../components/common/VerticalList";
import { HeroBanner } from "../components/HeroBanner";
import { useSelector, useDispatch } from "react-redux";
import { loadSingularPerson } from "../store/types/person";
import { addPersonToViewed } from "../store/types/viewed";
import { PersonInfo } from "../components/PersonInfo";

export const PersonPage = () => {
  const dispatch = useDispatch();
  let { personId } = useParams();
  let person = useSelector((state) => state.entities.person.currentPerson.data);
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  useEffect(() => {
    scrollToTop();
    dispatch(loadSingularPerson(personId));
    dispatch(addPersonToViewed());
  }, [dispatch, personId]);
  if (!person) return null;

  return (
    <React.Fragment>
      <HeroBanner data={person}>
        <PersonInfo data={person} />
      </HeroBanner>
      <div className="root">
        <div className="section flex">
          {renderMovieCredits(person)}
          {renderTvCredits(person)}
        </div>
      </div>
    </React.Fragment>
  );
};

const renderMovieCredits = ({ movie_credits }) => {
  if (!movie_credits.length) return null;
  return (
    <div className="section">
      <h3 className="section-title">Movies</h3>
      <VerticalList data={movie_credits} component={CreditsCard} />
    </div>
  );
};

const renderTvCredits = ({ tv_credits }) => {
  if (!tv_credits.length) return null;
  return (
    <div className="section">
      <h3 className="section-title">Shows</h3>
      <VerticalList data={tv_credits} component={CreditsCard} />
    </div>
  );
};
