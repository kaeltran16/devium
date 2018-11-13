import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LandingPage from './LandingPage';
import Register from './Auth/Register';
import Login from './Auth/Login';

const MainContainer = () => (
        <BrowserRouter>
            <Switch>
                <Route exact path={'/'} component={LandingPage}/>
                <Route path={'/register'} component={Register}/>
                <Route path={'/login'} component={Login}/>
            </Switch>
        </BrowserRouter>
    )
;

export default MainContainer;
