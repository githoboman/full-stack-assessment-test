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
        <Box minH="100vh" bg="transparent">
            {/* Header */}
            <Box
                bg="whiteAlpha.800"
                _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
                shadow="sm"
                mb={8}
                backdropFilter="blur(10px)"
                borderBottom="1px"
                borderColor="gray.100"
            >
                <Container maxW="container.xl" py={4}>
                    <HStack justify="space-between" align="center">
                        <Heading size="lg" color="gray.800" _dark={{ color: "white" }}>
                            Book Management
                        </Heading>
                        <HStack spacing={3}>
                            <Button
                                leftIcon={<Icon as={FiPlus} />}
                                colorScheme="blue"
                                onClick={onOpen}
                                size="sm"
                                shadow="md"
                            >
                                New Book
                            </Button>
                            <Button
                                leftIcon={<Icon as={FiLogOut} />}
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                size="sm"
                            >
                                Sign Out
                            </Button>
                        </HStack>
                    </HStack>
                    {user && (
                        <Box mt={1} fontSize="xs" color="gray.500" _dark={{ color: "gray.400" }}>
                            Logged in as {user.email}
                        </Box>
                    )}
                </Container>
            </Box>

            {/* Main Content */}
            <Container maxW="container.xl">
                <Box
                    bg="white"
                    _dark={{ bg: 'gray.800', borderColor: 'gray.700' }}
                    p={6}
                    borderRadius="xl"
                    shadow="xl"
                    border="1px"
                    borderColor="gray.100"
                >
                    <BookTable />
                </Box>
            </Container>

            <CreateBookModal isOpen={isOpen} onClose={onClose} />
        </Box>
    );
};
