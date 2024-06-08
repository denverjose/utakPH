import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from './components/Layout/Layout'
const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
};

export default App;
