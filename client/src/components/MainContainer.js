import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';

const MainContainer = () => (
   <BrowserRouter>
      <Switch>
         <Route exact path={'/'} component={LandingPage}/>
      </Switch>
   </BrowserRouter>
);

export default MainContainer;
