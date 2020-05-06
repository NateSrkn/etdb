import React from "react";
import { Route, Switch } from "react-router-dom";
import { AllPage } from "./pages/AllPage";
import { PersonPage } from "./pages/PersonPage";
import { CollectionPage } from "./pages/CollectionPage";

import { Header } from "./components/Header";
import { FeaturedHero } from "./components/FeaturedHero";
import { MediaPage } from "./pages/MediaPage";
import { MediaList } from "./components/MediaList";
import { Footer } from "./components/Footer";
import "./styles/main.scss";

const App = () => {
  return (
    <div className="App">
      <Header />
      <main id="main-root">
        <Switch>
          <Route exact path="/">
            <FeaturedHero />
            <div className="root">
              <section className="section">
                <MediaList type="movie" />
              </section>
              <section className="section">
                <MediaList type="tv" />
              </section>
            </div>
          </Route>
          <Route
            exact
            path="/all/movies"
            render={(props) => <AllPage type="movie" {...props} />}
          />
          <Route
            exact
            path="/all/shows"
            render={(props) => <AllPage type="tv" {...props} />}
          />
          <Route path="/collection/:collectionId" component={CollectionPage} />
        </Switch>
        <Switch>
          <Route path="/person/:personId" component={PersonPage} />
          <Route path="/movie/:movieId" component={MediaPage} />
          <Route path="/tv/:tvId" component={MediaPage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
