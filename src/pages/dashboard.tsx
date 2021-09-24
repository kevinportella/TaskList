import {
  Box,
  Flex,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  HStack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

import { Header } from '~/components/Header';

export default function Dashboard() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <>
      <Header />

      <Box
        bg="gray.800"
        flex="1"
        maxWidth={1480}
        borderRadius="8"
        mt="8"
        p={['2', '8']}
        mx="auto"
      >
        <Flex mb="8" justify="center" align="center">
          <Heading size="lg" fontWeight="normal">
            Users
          </Heading>
        </Flex>

        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              {isWideVersion && <Th>Gender</Th>}
              {isWideVersion && <Th>Birth</Th>}
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <Box>
                  <Text fontWeight="bold">Kevin</Text>
                  <Text fontSize="sm" color="gray.500">
                    email
                  </Text>
                </Box>
              </Td>
              {isWideVersion && <Td>Genero</Td>}
              {isWideVersion && <Td>Data</Td>}
              <Td>
                <Button
                  size="sm"
                  fontSize="sm"
                  bg="green.400"
                  // onClick={() => {
                  //   setCurrentUser(user);
                  //   setIsInfoUserModalOpen(true);
                  // }}
                >
                  <HStack spacing="1">
                    {isWideVersion && <Text>Info</Text>}
                  </HStack>
                </Button>
              </Td>
            </Tr>
          </Tbody>
        </Table>

        <Flex justify="center" pt="8">
          <Button
            size="md"
            fontSize="md"
            bg="green.400"
            // onClick={() => {
            //   updatePage(currentPage + 1);
            // }}
          >
            <HStack spacing="1">
              {isWideVersion && <Text>Load more...</Text>}
            </HStack>
          </Button>
        </Flex>
      </Box>
    </>
  );
}
