import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useAuth0 } from '@auth0/auth0-react';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

export const createApolloClient = (getAccessTokenSilently: () => Promise<string>) => {
    const authLink = setContext(async (_, { headers }) => {
        try {
            const token = await getAccessTokenSilently();
            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } catch (error) {
            console.error('Error getting access token:', error);
            return { headers };
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });
};
