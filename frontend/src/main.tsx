import React, { useMemo } from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import App from './App';
import { createApolloClient } from './apollo-client';
import { useAuth0 } from '@auth0/auth0-react';

const ApolloWrapper = ({ children }: { children: React.ReactNode }) => {
    const { getAccessTokenSilently } = useAuth0();

    // Memoize the client so it's not recreated on every render
    const client = useMemo(() => {
        return createApolloClient(getAccessTokenSilently);
    }, [getAccessTokenSilently]);

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

const Auth0ProviderWithHistory = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();

    const onRedirectCallback = () => {
        // Always navigate to the clean /dashboard path after login
        // to strip the ?code=... and ?state=... params from the URL
        navigate('/dashboard', { replace: true });
    };

    return (
        <Auth0Provider
            domain={import.meta.env.VITE_AUTH0_DOMAIN}
            clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
            authorizationParams={{
                redirect_uri: window.location.origin + '/dashboard',
                audience: import.meta.env.VITE_AUTH0_AUDIENCE,
                scope: 'openid profile email'
            }}
            onRedirectCallback={onRedirectCallback}
            cacheLocation="localstorage"
            useRefreshTokens={true}
            leeway={60}
        >
            {children}
        </Auth0Provider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Auth0ProviderWithHistory>
                <ChakraProvider>
                    <ApolloWrapper>
                        <App />
                    </ApolloWrapper>
                </ChakraProvider>
            </Auth0ProviderWithHistory>
        </BrowserRouter>
    </React.StrictMode>,
);