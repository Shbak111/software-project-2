import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import Second from "./routes/Second";
import Map from "./routes/Map";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/map">
          <Map />
        </Route>
        <Route path="/2">
          <Second />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
