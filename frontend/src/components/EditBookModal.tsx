import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    useToast,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_BOOK } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';

interface Book {
    id: number;
    name: string;
    description: string;
}

interface EditBookModalProps {
    isOpen: boolean;
    onClose: () => void;
    book: Book | null;
}

export const EditBookModal = ({ isOpen, onClose, book }: EditBookModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (book) {
            setName(book.name);
            setDescription(book.description);
        }
    }, [book]);

    const [updateBook, { loading }] = useMutation(UPDATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: () => {
            toast({
                title: 'Book updated',
                description: 'The book has been updated successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            onClose();
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!book) return;

        updateBook({
            variables: {
                input: {
                    id: book.id,
                    name,
                    description,
                },
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Book</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    placeholder="Book name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Book description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="full"
                                isLoading={loading}
                            >
                                Update Book
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
