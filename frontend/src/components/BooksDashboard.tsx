import { useAuth0 } from '@auth0/auth0-react';
import {
    Box,
    Button,
    Container,
    Heading,
    HStack,
    useDisclosure,
    Icon,
} from '@chakra-ui/react';
import { FiPlus, FiLogOut } from 'react-icons/fi';
import { BookTable } from './BookTable';
import { CreateBookModal } from './CreateBookModal';

export const BooksDashboard = () => {
    const { logout, user } = useAuth0();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box minH="100vh" bg="gray.50">
            <Box bg="white" shadow="sm" mb={8}>
                <Container maxW="container.xl" py={4}>
                    <HStack justify="space-between">
                        <Heading size="lg">Book Management Dashboard</Heading>
                        <HStack spacing={4}>
                            <Button
                                leftIcon={<Icon as={FiPlus} />}
                                colorScheme="blue"
                                onClick={onOpen}
                            >
                                Create Book
                            </Button>
                            <Button
                                leftIcon={<Icon as={FiLogOut} />}
                                variant="outline"
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            >
                                Sign Out
                            </Button>
                        </HStack>
                    </HStack>
                    {user && (
                        <Box mt={2} fontSize="sm" color="gray.600">
                            Signed in as {user.email}
                        </Box>
                    )}
                </Container>
            </Box>

            <Container maxW="container.xl">
                <Box bg="white" p={6} borderRadius="lg" shadow="md">
                    <BookTable />
                </Box>
            </Container>

            <CreateBookModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
