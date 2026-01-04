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
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOK } from '../graphql/mutations';
import { GET_BOOKS } from '../graphql/queries';

interface CreateBookModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateBookModal = ({ isOpen, onClose }: CreateBookModalProps) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const toast = useToast();

    const [createBook, { loading }] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
        onCompleted: (data) => {
            console.log('Mutation completed. Data:', data);
            toast({
                title: 'Book created',
                description: 'The book has been created successfully.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            setName('');
            setDescription('');
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
        createBook({
            variables: {
                input: { name, description },
            },
        });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Book</ModalHeader>
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
                                    isDisabled={loading}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Book description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={4}
                                    isDisabled={loading}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                width="full"
                                isLoading={loading}
                            >
                                Create Book
                            </Button>
                        </VStack>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
