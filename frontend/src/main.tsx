import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import App from './App';
import { createApolloClient } from './apollo-client';
import { useAuth0 } from '@auth0/auth0-react';

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    const { getAccessTokenSilently } = useAuth0();
    const client = createApolloClient(getAccessTokenSilently);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin + '/dashboard',
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            }}
        >
            <ChakraProvider>
                <ApolloWrapper>
                    <App />
                </ApolloWrapper>
            </ChakraProvider>
        </Auth0Provider>
    </React.StrictMode>,
);
