import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Container, Heading, Text, VStack, Icon } from '@chakra-ui/react';
import { FiBook } from 'react-icons/fi';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
            <Container maxW="md" textAlign="center">
                <VStack spacing={8}>
                    <Icon as={FiBook} boxSize={16} color="blue.500" />
                    <Heading size="2xl">Book Management</Heading>
                    <Text fontSize="lg" color="gray.600">
                        Manage your book collection with ease. Sign in to get started.
                    </Text>
                    <Button
                        colorScheme="blue"
                        size="lg"
                        onClick={() => loginWithRedirect()}
                        px={10}
                    >
                        Sign In with Auth0
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
};
