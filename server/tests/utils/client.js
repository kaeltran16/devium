import ApolloBoost from 'apollo-boost';

const client = (jwt) =>
   new ApolloBoost({
      uri: 'http://localhost:5000',
      request: (operation) => {
         if (jwt) {
            operation.setContext({
               headers: {
                  Authorization: `Bearer ${jwt}`
               }
            });
         }
      }
   });

export default client;

