import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { FeaturedHero } from './components/FeaturedHero'
import { MediaList } from './components/MediaList'
import { MediaPage } from './pages/MediaPage'
import { AllPage } from './pages/AllPage'
import { PersonPage } from './pages/PersonPage'
import { Section, Root } from './components/Layout';
import './styles/main.scss';

const App = () => {
  
  return (
    <div className="App">
      <Root className="root">
        <Section className="section">
          <Header />
        </Section>
      </Root>
      <Switch>
        <Route exact path="/">
          <Root className="root">
            <Section className="section">
              <FeaturedHero />
            </Section>
            <Section className="section">
              <MediaList type="movie" isLatest={true} />
            </Section>
            <Section className="section">
              <MediaList type="tv" isLatest={true} />
            </Section>
          </Root>
        </Route>
        <Route path="/movie/:movieId">
            <MediaPage type='movie' />
        </Route>
        <Route path="/tv/:tvId">
            <MediaPage type='tv' />
        </Route>
        <Route path="/person/:personId">
            <PersonPage />
        </Route>
        <Route path="/all/movies">
            <AllPage key="movie" type="movie" />
        </Route>
        <Route path="/all/shows">
            <AllPage key="tv" type="tv" />
        </Route>
      </Switch>
    </div>
  )
}

export default App;
