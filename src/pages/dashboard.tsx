import React, { useState, useEffect, useCallback } from 'react';
import { RiAddLine, RiEdit2Fill, RiDeleteBinFill } from 'react-icons/ri';

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  HStack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useBreakpointValue,
  Icon,
} from '@chakra-ui/react';
import firebase from 'firebase/app';

import { Header } from '~/components/Header';
import { ModalTask } from '~/components/ModalTask';
import { ModalAddTask } from '~/components/ModalTask/ModalAddTask';
import { ModalEditTask } from '~/components/ModalTask/ModalEditTask';

export default function Dashboard() {
  const [isInfoTaskModalOpen, setIsInfoTaskModalOpen] = useState(false);
  const [addTaskModalOpen, setAddTaskModalOpen] = useState(false);
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);

  function handleCloseInfoUserModal() {
    setIsInfoTaskModalOpen(false);
  }
  function handleCloseAddTaskModal() {
    setAddTaskModalOpen(false);
  }
  function handleCloseEditTaskModal() {
    setEditTaskModalOpen(false);
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const getTasks = useCallback(async () => {
    await firebase
      .firestore()
      .collection('tasks')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.data();
        });
      })
      .catch((error) => {
        error.message();
      });
  }, []);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <Header />

      <Box
        bg="gray.800"
        flex="1"
        maxWidth={1480}
        borderRadius="8"
        mt="8"
        p={['4', '8']}
        mx="auto"
      >
        <Flex mb="4" justify="space-between" align="center">
          <Heading size="lg" fontWeight="bold">
            Tarefas
          </Heading>
          <Button
            as="a"
            size="sm"
            fontSize="sm"
            colorScheme="green"
            onClick={() => {
              setAddTaskModalOpen(true);
            }}
            leftIcon={<Icon as={RiAddLine} fontSize="20" />}
          >
            Nova tarefa
          </Button>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              <Th px={['4', '4', '6']} color="gray.300" w="8">
                <Checkbox colorScheme="pink" />
              </Th>
              <Th>Tarefa</Th>
              {isWideVersion && <Th>Data de Atualização</Th>}
              {isWideVersion && <Th>Status</Th>}
              <Th>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td px={['4', '4', '6']}>
                <Checkbox colorScheme="pink" />
              </Td>
              <Td>
                <Box>
                  <Button
                    variant="link"
                    onClick={() => {
                      setIsInfoTaskModalOpen(true);
                    }}
                  >
                    <Text fontWeight="bold">Tarefa</Text>
                  </Button>
                  <Text fontSize="sm" color="gray.500">
                    Kevin
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>Data</Td>}
              {isWideVersion && (
                <Td>
                  <Badge variant="solid" colorScheme="yellow">
                    Pendente
                  </Badge>
                </Td>
              )}
              <Td>
                <HStack>
                  <Button
                    size="sm"
                    fontSize="sm"
                    colorScheme="green"
                    leftIcon={<Icon as={RiEdit2Fill} />}
                    onClick={() => {
                      setEditTaskModalOpen(true);
                    }}
                  >
                    <HStack spacing="1">
                      {isWideVersion && <Text>Editar</Text>}
                    </HStack>
                  </Button>
                  <Button
                    size="sm"
                    fontSize="sm"
                    colorScheme="red"
                    leftIcon={<Icon as={RiDeleteBinFill} />}
                  >
                    <HStack spacing="1">
                      {isWideVersion && <Text>Deletar</Text>}
                    </HStack>
                  </Button>
                </HStack>
              </Td>
            </Tr>
          </Tbody>
        </Table>
        <ModalTask
          isOpen={isInfoTaskModalOpen}
          onClose={handleCloseInfoUserModal}
        />
        <ModalAddTask
          isOpen={addTaskModalOpen}
          onClose={handleCloseAddTaskModal}
        />
        <ModalEditTask
          isOpen={editTaskModalOpen}
          onClose={handleCloseEditTaskModal}
        />
      </Box>
    </>
  );
}
