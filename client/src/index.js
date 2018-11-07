import ApolloClient from 'apollo-boost';
import React from 'react';
import {ApolloProvider, Query} from 'react-apollo';
import ReactDOM from 'react-dom';
import MainContainer from './components/MainContainer';
import {currentUser} from './queries';
import * as serviceWorker from './serviceWorker';
import setGlobalStyles from './styles/global';
import withCustomTheme from "./withCustomTheme";

setGlobalStyles();

const client = new ApolloClient({
    uri: 'http://localhost:5000',
    fetchOptions: {
        credentials: 'include'
    },
    request: async (operation) => {
        const token = await localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    },
    onError: ({networkError}) => {
        if (networkError) {
            if (networkError.statusCode === 401) {
                localStorage.removeItem('token');
            }
        }
    },
    clientState: {
        defaults: {}
    }
});

const Root = () => (
    <Query query={currentUser}>
        {({data, loading}) =>
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
