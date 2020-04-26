import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { FeaturedHero } from './components/FeaturedHero'
import { MediaList } from './components/MediaList'
import { MoviePage } from './pages/MoviePage'
import { ShowPage } from './pages/ShowPage'
import { AllPage } from './pages/AllPage'
import { PersonPage } from './pages/PersonPage'
import { CollectionPage } from './pages/CollectionPage'
import { Section, Root } from './components/Layout';
import { useDispatch, useSelector } from 'react-redux'
import './styles/main.scss';
import { loadMovies } from './store/types/movies';
import { loadShows } from './store/types/shows';

const App = () => {
  const dispatch = useDispatch()
  const movies = useSelector(state => state.entities.movies.list)
  const shows = useSelector(state => state.entities.shows.list)
  const moviesLoading = useSelector(state => state.entities.movies.isLoading)
  const showsLoading = useSelector(state => state.entities.shows.isLoading)
  useEffect(() => {
    dispatch(loadMovies())
    dispatch(loadShows())
  }, [dispatch])

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <FeaturedHero />
          <Root>
            <Section className="section">
              {!moviesLoading && movies.length && <MediaList data={movies} type="movie" />}
            </Section>
            <Section className="section">
              {!showsLoading && shows.length && <MediaList data={shows} type="tv" />}
            </Section>
          </Root>
        </Route>
        <Route path="/person/:personId">
            <PersonPage key="person" />
        </Route>
        <Route path="/all/movies">
            <AllPage key="movies" type="movie" />
        </Route>
        <Route path="/all/shows">
            <AllPage key="shows" type="tv" />
        </Route>
        <Route path="/collection/:collectionId">
          <CollectionPage key="collection" />
        </Route>
      </Switch>
      <Switch>
          <Route path="/movie/:movieId">
              <MoviePage/>
          </Route>
        </Switch>
        <Switch>
          <Route path="/tv/:tvId">
              <ShowPage />
          </Route>
        </Switch>
    </div>
  )
}

export default App;
