import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Show from "./routes/Show";
import Map from "./routes/Map";
import Restaurant_recommendation from "./routes/Restaurant_recommendation";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/restaurant_recommendation">
          <Restaurant_recommendation />
        </Route>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/Detail">
          <Detail />
        </Route>
        <Route path="/Show">
          <Show />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
