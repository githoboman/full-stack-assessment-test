/// <reference types="vite/client" />

import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
});

// Error handling link
const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            if (import.meta.env.DEV) {
                console.error(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`
                );
            }
        });
    }

    if (networkError) {
        if (import.meta.env.DEV) {
            console.error(`[Network error]: ${networkError}, Operation: ${operation.operationName}`);
        }
    }
});

export const createApolloClient = (getAccessTokenSilently: () => Promise<string>) => {
    const authLink = setContext(async (operation, { headers }) => {
        try {
            if (import.meta.env.DEV) {
                console.log(`Getting access token for GraphQL operation: ${operation.operationName}`);
            }
            const token = await getAccessTokenSilently();

            if (!token) {
                if (import.meta.env.DEV) {
                    console.warn('No access token returned from getAccessTokenSilently');
                }
            }

            return {
                headers: {
                    ...headers,
                    authorization: token ? `Bearer ${token}` : '',
                },
            };
        } catch (error: any) {
            if (import.meta.env.DEV) {
                console.error('Error getting access token in Apollo link:', error);

                // If it's a login_required error, we might want to log it specifically
                if (error.error === 'login_required' || error.error === 'consent_required') {
                    console.error('Auth0 session expired or consent required');
                }
            }

            return { headers };
        }
    });

    return new ApolloClient({
        link: from([errorLink, authLink, httpLink]),
        cache: new InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        books: {
                            merge(existing = [], incoming: any[]) {
                                return incoming;
                            },
                        },
                    },
                },
            },
        }),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'all',
            },
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    });
};