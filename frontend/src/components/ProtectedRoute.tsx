import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { Spinner, Center, VStack, Heading, Button, Text as ChakraText } from '@chakra-ui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, user, error } = useAuth0();
    const [searchParams] = useSearchParams();

    const hasAuthParams = searchParams.has('code') || searchParams.has('state') || searchParams.has('error');

    console.log('ProtectedRoute:', {
        isLoading,
        isAuthenticated,
        hasAuthParams,
        user: user?.email,
        error: error?.message
    });

    // If Auth0 is loading OR it's a callback redirect (code/state present)
    // stay in the loading state to allow Auth0 to process the parameters
    if (isLoading || (hasAuthParams && !isAuthenticated && !error)) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    if (error) {
        const handleReset = () => {
            console.log('Clearing all storage and redirecting to home...');
            localStorage.clear();
            sessionStorage.clear();
            // Redirect to root and force reload
            window.location.href = window.location.origin;
        };

        return (
            <Center h="100vh">
                <VStack spacing={6} textAlign="center" p={10} bg="white" shadow="2xl" borderRadius="2xl" maxW="md">
                    <Heading size="lg" color="red.500">Authentication Issue</Heading>
                    <VStack spacing={2}>
                        <ChakraText fontWeight="bold" color="gray.700">{error.message}</ChakraText>
                        <ChakraText fontSize="sm" color="gray.500">
                            This usually happens if you refresh an old login page or your session expired.
                        </ChakraText>
                    </VStack>
                    <Button
                        colorScheme="blue"
                        size="lg"
                        width="full"
                        onClick={handleReset}
                    >
                        Clear Session & Try Again
                    </Button>
                    <ChakraText fontSize="xs" color="gray.400">
                        Clicking this will reset your login state and take you back to the start.
                    </ChakraText>
                </VStack>
            </Center>
        );
    }

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to /');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
