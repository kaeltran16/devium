import React from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';
import * as serviceWorker from './serviceWorker';
import setGlobalStyles from './styles/global';
import withCustomTheme from './withCustomTheme';
import { getCurrentUser } from './queries';
import client from './client';

setGlobalStyles();

const Root = () => (
    <Query query={getCurrentUser}>
       {({ data, loading }) =>
           loading ? null : <MainContainer/>
       }
    </Query>
);

const ThemedRoot = withCustomTheme(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
       <ThemedRoot/>
    </ApolloProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
