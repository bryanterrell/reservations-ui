import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { AppContainer } from 'react-hot-loader'
import Routes from './routes'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache: new InMemoryCache(),
});


const renderApp = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer>
        <Component/>
      </AppContainer>
    </ApolloProvider>,
    document.getElementById('app')
  );
};

renderApp(Routes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(require('./routes').default);
  })
}
