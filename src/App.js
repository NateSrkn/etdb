import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { ScrollList } from './components/ScrollList'
import { MoviePage } from './pages/MoviePage'
import { TVPage } from './pages/TVPage'
import { PersonPage } from './pages/PersonPage'
import './styles/main.scss';

const App = () => {
  
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
        <div className="page">
          <div className="section">
            <h3>Movies</h3>
            <div className="section-list">
              <ScrollList type="movie" isLatest={false} />
            </div>
          </div>
          <div className="section">
            <h3>Shows</h3>
            <div className="section-list">
              <ScrollList type="tv" isLatest={false} />
            </div>
          </div>
        </div>
        </Route>
        <Route path="/movie/:movieId">
          <MoviePage />
        </Route>
        <Route path="/tv/:tvId">
          <TVPage />
        </Route>
        <Route path="/person/:personId">
          <PersonPage />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
