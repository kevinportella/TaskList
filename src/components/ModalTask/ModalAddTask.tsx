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

interface ModalUsersProps {
  isOpen: boolean;
  onClose: () => void;
}
export function ModalAddTask({ isOpen, onClose }: ModalUsersProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="gray.800">
        <ModalHeader>
          <Stack>
            <Flex>
              <Editable
                selectAllOnFocus={false}
                fontSize="3xl"
                defaultValue="Título"
              >
                <EditablePreview />
                <EditableInput />
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
            <Textarea placeholder="Descrição" />
            <Stack>
              <Text fontSize="sm">Ultima atualização:</Text>
              <Text fontSize="sm">Data de criação:</Text>
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
