import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

export const createApolloClient = (getAccessTokenSilently: () => Promise<string>) => {
    const authLink = setContext(async (operation, { headers }) => {
        try {
            console.log(`Getting access token for GraphQL operation: ${operation.operationName}`);
            const token = await getAccessTokenSilently();

            if (!token) {
                console.warn('No access token returned from getAccessTokenSilently');
            }

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } catch (error: any) {
            console.error('Error getting access token in Apollo link:', error);

            // If it's a login_required error, we might want to log it specifically
            if (error.error === 'login_required' || error.error === 'consent_required') {
                console.error('Auth0 session expired or consent required');
            }

            return { headers };
        }
    });

    return new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        books: {
                            merge(_existing, incoming) {
                                return incoming;
                            },
                        },
                    },
                },
            },
        }),
    });
};
