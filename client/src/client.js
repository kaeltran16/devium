import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
   uri: 'http://localhost:4000',
   fetchOptions: {
      credentials: 'include'
   },
   request: async operation => {
      const token = await localStorage.getItem('token');
      operation.setContext({
         headers: {
            authorization: `Bearer ${token}`
         }
      });
   },
   onError: ({ networkError }) => {
      if (networkError) {
         if (networkError.statusCode === 401) {
            localStorage.removeItem('token');
         }
      }
   }
});

export default client;
