import { Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import { Input } from '~/components/Form/Input';

export default function SignUp() {
  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Stack spacing="8" maxW={['md', 'lg']}>
        <Stack align="center">
          <Heading fontSize={['3xl', '4xl']}>Crie sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar todos os recursos ✌️
          </Text>
        </Stack>
        <Flex
          as="form"
          w="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
        >
          <Stack spacing="2">
            <Input name="name" type="name" label="Nome" />
            <Input name="email" type="email" label="E-mail" />
            <Input name="password" type="password" label="Senha" />
            <Input
              name="confirm_password"
              type="password"
              label="Confirme sua senha"
            />
          </Stack>
          <Stack spacing="6">
            <Button type="submit" mt="6" colorScheme="blue" size="lg">
              Cadastrar
            </Button>
            <Flex
              align={'center'}
              _before={{
                content: '""',
                borderBottom: '1px solid',
                flexGrow: 1,
                mr: 8,
              }}
              _after={{
                content: '""',
                borderBottom: '1px solid',
                flexGrow: 1,
                ml: 8,
              }}
            >
              Ou
            </Flex>
            <Button type="submit" mt="6" colorScheme="teal" size="lg">
              Acesse sua conta
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Flex>
  );
}
