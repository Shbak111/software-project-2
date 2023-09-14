import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Map from "./routes/Map";
import RestaurantRecommendation from "./routes/Restaurant_recommendation";
import HHeader from "./componentes/HHeader";
import "./css/HHeader.css";
import DataTest from "./routes/DataTest";
import SearchedData from "./routes/SearchedData";
import Community from "./routes/Community";
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
          <Route
            path="/SearchedData"
            render={(routeProps) => (
              <SearchedData
                selectedArea={routeProps.location.state.selectedArea}
                selectedField={routeProps.location.state.selectedField}
                selectedDate={routeProps.location.state.selectedDate}
              />)}
          />
          <Route path="/Community">
            <Community />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
