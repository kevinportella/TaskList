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

import { useLoading } from '~/hooks/loading';

const signInFormSchema = yup.object({
  email: yup.string().email('E-mail inválido.').required('E-mail obrigatório.'),
});

type ISignInForm = yup.Asserts<typeof signInFormSchema>;

export default function ForgotPassword() {
  const { register, handleSubmit, formState } = useForm<ISignInForm>({
    resolver: yupResolver(signInFormSchema),
    reValidateMode: 'onBlur',
  });

  const toast = useToast();
  const router = useRouter();
  const { setLoading } = useLoading();

  const handleReset: SubmitHandler<ISignInForm> = async (data) => {
    setLoading(true);

    try {
      await firebase.auth().sendPasswordResetEmail(data.email);

      router.push('/');
    } catch (err) {
      toast({
        title: 'Failed to reset password',
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
          <Heading fontSize={['3xl', '4xl']}>Reset sua senha</Heading>
        </Stack>
        <Box bg="gray.800" rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(handleReset)}>
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
              <Text align="center" fontSize="sm">
                <NextLink href="/auth/forgot-password" passHref>
                  <a>Login?</a>
                </NextLink>
              </Text>
              <Stack spacing={6}>
                <Button colorScheme="blue" type="submit">
                  Enviar
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
