import React from 'react';
import { Route, Switch } from 'react-router-dom'
import { Header } from './components/Header'
import { FeaturedHero } from './components/FeaturedHero'
import { MediaList } from './components/MediaList'
import { MediaPage } from './pages/MediaPage'
import { TVPage } from './pages/TVPage'
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
              <MediaList type="movie" isLatest={false} />
            </Section>
            <Section className="section">
              <MediaList type="tv" isLatest={false} />
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
      </Switch>
    </div>
  )
}

export default App;
