import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import firebase from 'firebase/app';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { useLoading } from '~/contexts/loading';

const signInFormSchema = yup.object({
  email: yup.string().email('E-mail inválido.').required('E-mail obrigatório.'),
  password: yup.string().required('Senha obrigatório.'),
});

type ISignInForm = yup.Asserts<typeof signInFormSchema>;

export default function Home() {
  const { register, handleSubmit, formState } = useForm<ISignInForm>({
    resolver: yupResolver(signInFormSchema),
    reValidateMode: 'onBlur',
  });

  const toast = useToast();
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleSignIn: SubmitHandler<ISignInForm> = async (data) => {
    setLoading(true);

    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);

      router.push('/dashboard');
    } catch (err) {
      toast({
        title: 'Erro no login',
        description: `${err.message}`,
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(true);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Stack spacing="8" maxW={['md', 'lg']}>
        <Stack align="center">
          <Heading fontSize={['3xl', '4xl']}>Entre na sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar todos os recursos ✌️
          </Text>
        </Stack>
        <Box bg="gray.800" rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(handleSignIn)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!formState.errors?.email}>
                <FormLabel>Endereço de e-mail</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  type="text"
                  id="inputEmail"
                  {...register('email', { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.email?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!formState.errors?.password}>
                <FormLabel>Senha</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  type="password"
                  id="inputPassword"
                  {...register('password', { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.password?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={6}>
                <Button colorScheme="blue" type="submit">
                  Entrar
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

                <NextLink href="/auth/sign-up" passHref>
                  <Button as="a" colorScheme="teal">
                    Criar conta
                  </Button>
                </NextLink>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
