import {
  Badge,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ModalTask({ isOpen, onClose }: ModalUsersProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
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
