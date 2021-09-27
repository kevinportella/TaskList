import { useState } from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Stack,
  Flex,
  Badge,
  Editable,
  EditableInput,
  EditablePreview,
  Textarea,
} from '@chakra-ui/react';
import firebase from 'firebase/app';

interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ModalAddTask({ isOpen, onClose }: ModalUsersProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const db = firebase.firestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection('tasks')
      .add({
        completed: false,
        createdAt: new Date(),
        description,
        status,
        title,
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    setTitle('');
    setDescription('');
    setStatus('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent onSubmit={handleSubmit} bg="gray.800">
        <ModalHeader>
          <Stack>
            <Flex>
              <Editable
                selectAllOnFocus={false}
                fontSize="3xl"
                defaultValue="Título"
              >
                <EditablePreview />
                <EditableInput
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Editable>
            </Flex>
            <Flex>
              <Badge variant="solid" colorScheme="yellow">
                Pendente
              </Badge>
            </Flex>
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="12">
            <Textarea
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Stack>
              <Text fontSize="sm">Ultima atualização:</Text>
              <Text fontSize="sm">Data de criação:</Text>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr="3" onClick={handleSubmit}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
