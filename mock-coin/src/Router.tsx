import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import Trade from './Pages/Trade';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/trade" exact>
          <Trade />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
