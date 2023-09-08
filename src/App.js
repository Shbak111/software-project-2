import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Map from "./routes/Map";
import RestaurantRecommendation from "./routes/Restaurant_recommendation";
import HHeader from "./componentes/HHeader";
import "./css/HHeader.css";
import DataTest from "./routes/DataTest";

function App() {
  return (
    <div className="root-wrap">
      <Router>
        <HHeader />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/restaurant_recommendation">
            <RestaurantRecommendation />
          </Route>
          <Route path="/map">
            <Map />
          </Route>
          <Route path="/detail">
            <Detail />
          </Route>
          <Route path="/data">
            <DataTest />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
