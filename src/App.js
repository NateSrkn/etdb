import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { FeaturedHero } from './components/FeaturedHero'
import { MediaList } from './components/MediaList'
import { MediaPage } from './pages/MediaPage'
import { AllPage } from './pages/AllPage'
import { PersonPage } from './pages/PersonPage'
import { CollectionPage } from './pages/CollectionPage'
import { Section, Root } from './components/Layout';
import './styles/main.scss';

const App = () => {
  
  return (
    <div className="App">
      <div className="root">
        <section className="section">
          <Header />
        </section>
      </div>
      <Switch>
        <Route exact path="/">
          <FeaturedHero />
          <Root>
            <Section className="section">
              <MediaList type="movie" isLatest={true} />
            </Section>
            <Section className="section">
              <MediaList type="tv" isLatest={true} />
            </Section>
          </Root>
        </Route>
        <Route path="/movie/:movieId">
            <MediaPage key=":movieId" type='movie' />
        </Route>
        <Route path="/tv/:tvId">
            <MediaPage key=":tvId" type='tv' />
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
    </div>
  )
}

export default App;
