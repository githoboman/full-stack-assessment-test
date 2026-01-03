import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { Box, Spinner, Center } from '@chakra-ui/react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, user } = useAuth0();

    console.log('ProtectedRoute: isLoading:', isLoading, 'isAuthenticated:', isAuthenticated, 'user:', user);

    if (isLoading) {
        return (
            <Center h="100vh">
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    if (!isAuthenticated) {
        console.log('Not authenticated, redirecting to /');
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
