import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useDisclosure,
    useToast,
    Spinner,
    Center,
    Text,
    HStack,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Button,
    VStack,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKS } from '../graphql/queries';
import { DELETE_BOOK } from '../graphql/mutations';
import { EditBookModal } from './EditBookModal';
import { useState, useRef, useEffect } from 'react';

interface Book {
    id: number;
    name: string;
    description: string;
}

export const BookTable = () => {
    const { data, loading, error, refetch } = useQuery(GET_BOOKS, {
        fetchPolicy: 'network-only',
        notifyOnNetworkStatusChange: true,
    });
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [bookToDelete, setBookToDelete] = useState<number | null>(null);
    const cancelRef = useRef(null);
    const toast = useToast();

    useEffect(() => {
        if (error) {
            console.error('Query error details:', {
                message: error.message,
                graphQLErrors: error.graphQLErrors,
                networkError: error.networkError,
            });
        }
    }, [error]);

    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            toast({
                title: 'Book deleted',
                description: 'The book has been deleted successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setBookToDelete(null);
        },
        onError: (error) => {
            toast({
                title: 'Error',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        },
    });

    const handleEdit = (book: Book) => {
        setSelectedBook(book);
        onOpen();
    };

    const handleDeleteClick = (id: number) => {
        setBookToDelete(id);
    };

    const handleDeleteConfirm = () => {
        if (bookToDelete) {
            deleteBook({ variables: { id: bookToDelete } });
        }
    };

    if (loading) {
        return (
            <Center py={10}>
                <Spinner size="xl" color="blue.500" />
            </Center>
        );
    }

    if (error) {
        return (
            <Center py={10}>
                <VStack spacing={4}>
                    <Text color="red.500" fontSize="lg" fontWeight="bold">
                        Error loading books
                    </Text>
                    <Text color="gray.600" fontSize="sm">
                        {error.message}
                    </Text>
                    <Button colorScheme="blue" onClick={() => refetch()}>
                        Try Again
                    </Button>
                </VStack>
            </Center>
        );
    }

    const books = data?.books || [];

    if (books.length === 0) {
        return (
            <Center py={10}>
                <Text color="gray.500" fontSize="lg">
                    No books yet. Create your first book!
                </Text>
            </Center>
        );
    }

    return (
        <>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th color="gray.600" _dark={{ color: 'gray.400' }}>ID</Th>
                        <Th color="gray.600" _dark={{ color: 'gray.400' }}>Name</Th>
                        <Th color="gray.600" _dark={{ color: 'gray.400' }}>Description</Th>
                        <Th color="gray.600" _dark={{ color: 'gray.400' }}>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {books.map((book: Book) => (
                        <Tr key={book.id}>
                            <Td color="gray.700" _dark={{ color: 'gray.300' }}>{book.id}</Td>
                            <Td fontWeight="medium" color="gray.900" _dark={{ color: 'white' }}>{book.name}</Td>
                            <Td color="gray.600" _dark={{ color: 'gray.400' }}>{book.description}</Td>
                            <Td>
                                <HStack spacing={2}>
                                    <IconButton
                                        aria-label="Edit book"
                                        icon={<FiEdit2 />}
                                        colorScheme="blue"
                                        variant="ghost"
                                        onClick={() => handleEdit(book)}
                                    />
                                    <IconButton
                                        aria-label="Delete book"
                                        icon={<FiTrash2 />}
                                        colorScheme="red"
                                        variant="ghost"
                                        onClick={() => handleDeleteClick(book.id)}
                                    />
                                </HStack>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <EditBookModal isOpen={isOpen} onClose={onClose} book={selectedBook} />

            <AlertDialog
                isOpen={bookToDelete !== null}
                leastDestructiveRef={cancelRef}
                onClose={() => setBookToDelete(null)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Book
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setBookToDelete(null)}>
                                Cancel
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteConfirm} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};
