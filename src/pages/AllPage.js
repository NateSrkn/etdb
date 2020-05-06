import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchBulk, fetchGenres } from "../api/functions";
import { GridList } from "../components/common/GridList";
import { MediaCard } from "../components/cards/MediaCard";
import { Button } from "../components/common/Button";
import { ListGroup } from "../components/common/ListGroup";
import { usePrevious } from "../hooks/usePrevious";
import { Accordion } from "../components/common/Accordion";
export const AllPage = ({ type }) => {
  const { pathname } = useLocation();
  const prevPath = usePrevious(pathname);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState();
  let [data, setData] = useState([]);
  let [currentPage, setCurrentPage] = useState(1);
  let [meta, setMeta] = useState(null);

  const getPagedData = () => {
    let filteredData = data;
    console.log(selectedGenre);
    if (selectedGenre && selectedGenre.id) {
      filteredData = data.filter(({ genres }) =>
        genres.includes(selectedGenre.id)
      );
    }
    return filteredData;
  };

  const listItems = getPagedData();

  useEffect(() => {
    const fetchItems = async () => {
      const { meta, results: media } = await fetchBulk(type, currentPage);
      let { genres } = await fetchGenres(type);
      genres = [{ id: "", name: "All Genres" }, ...genres];
      setData((data) => data.concat(media));
      setMeta(meta);
      setGenres(genres);
    };
    fetchItems();

    if (pathname !== prevPath)
      return () => {
        setSelectedGenre();
        setCurrentPage(1);
        setData([]);
      };
  }, [currentPage, type, pathname, prevPath]);

  const handlePageChange = (event) => {
    event.preventDefault();
    if (currentPage < meta.total_pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <React.Fragment>
      <div className="root">
        <section className="section flex">
          <section className="section">
            <Accordion title="Genres">
              <ListGroup
                listItems={genres}
                selectedItem={selectedGenre}
                onItemSelect={handleGenreSelect}
              />
            </Accordion>
          </section>
          <section className="section">
            <h3>{type === "movie" ? "All Movies" : "All Shows"}</h3>
            <div className="results">
              {listItems.length} / {meta && meta.total_results}
            </div>
            {listItems && listItems.length ? (
              <GridList data={listItems} component={MediaCard} type={type} />
            ) : (
              "There are no results"
            )}

            <Button
              onClick={(event) => handlePageChange(event)}
              style={{ margin: "0 auto" }}
            >
              Find More
            </Button>
          </section>
        </section>
      </div>
    </React.Fragment>
  );
};
