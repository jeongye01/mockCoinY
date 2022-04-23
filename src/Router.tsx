import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={['/', '/:coinId']} exact>
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
