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
} from '@chakra-ui/react';
import firebase from 'firebase/app';

interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ModalTask({ isOpen, onClose }: ModalUsersProps) {
  const [taskId, setTaskId] = useState('');

  const db = firebase.firestore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await db
      .collection('tasks')
      .doc(taskId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log('Document data:', doc.data());
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent onSubmit={handleSubmit} bg="gray.800">
        <ModalHeader>
          <Stack>
            <Text fontSize="4xl">Título</Text>
            <Text fontSize="sm" color="gray.500">
              Autor: Kevin
            </Text>
            <Flex>
              <Badge variant="solid" colorScheme="yellow">
                Pendente
              </Badge>
            </Flex>
          </Stack>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing="24">
            <Text fontSize="sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quas
              autem soluta, sit, totam temporibus, odit eos distinctio pariatur
              tempore corrupti hic id voluptatum. Eos eius praesentium ad
              temporibus optio tempore?
            </Text>
            <Stack>
              <Text fontSize="sm">Ultima atualização: Hoje</Text>
              <Text fontSize="sm" color="gray.500">
                Data de criação: Ontem
              </Text>
            </Stack>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" mr="3" onClick={onClose}>
            Salvar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
