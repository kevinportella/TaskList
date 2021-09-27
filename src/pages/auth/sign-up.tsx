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
import firebase from 'firebase';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import * as yup from 'yup';

import { useLoading } from '~/hooks/loading';

const signUpFormSchema = yup.object({
  name: yup.string().required('Nome obrigatório.'),
  email: yup.string().email('E-mail inválido.').required('E-mail obrigatório.'),
  password: yup
    .string()
    .required('Senha obrigatório.')
    .min(6, 'Senha muito curta, mínimo 6 caracteres.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas diferentes.'),
});
type ISignUpForm = yup.Asserts<typeof signUpFormSchema>;

export default function SignUp() {
  const { register, handleSubmit, formState } = useForm<ISignUpForm>({
    resolver: yupResolver(signUpFormSchema),
    reValidateMode: 'onBlur',
  });

  const router = useRouter();
  const { setLoading } = useLoading();

  const toast = useToast();

  const handleSignUp: SubmitHandler<ISignUpForm> = async (data) => {
    setLoading(true);
    try {
      const userCreated = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await userCreated.user.updateProfile({
        displayName: data.name,
      });

      router.push('/');
    } catch (err) {
      toast({
        title: 'Erro na criação da conta',
        description: `${err.message}`,
        status: 'error',
        duration: 7000,
        isClosable: true,
        position: 'top',
      });
    }
    setLoading(false);
  };

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Stack spacing="8" maxW={['md', 'lg']}>
        <Stack align="center">
          <Heading fontSize={['3xl', '4xl']}>Crie sua conta</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            para aproveitar todos os recursos ✌️
          </Text>
        </Stack>
        <Box bg="gray.800" rounded={'lg'} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <Stack spacing={4}>
              <FormControl isInvalid={!!formState.errors?.name}>
                <FormLabel>Nome</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  type="text"
                  id="inputName"
                  {...register('name', { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.name?.message}
                </FormErrorMessage>
              </FormControl>

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

              <FormControl isInvalid={!!formState.errors?.passwordConfirm}>
                <FormLabel>Confirme sua senha</FormLabel>
                <Input
                  focusBorderColor="blue.200"
                  bgColor="gray.900"
                  variant="filled"
                  _hover={{
                    bgColor: 'gray.900',
                  }}
                  type="password"
                  id="inputPasswordConfirm"
                  {...register('passwordConfirm', { required: true })}
                />
                <FormErrorMessage>
                  {formState.errors.passwordConfirm?.message}
                </FormErrorMessage>
              </FormControl>

              <Stack spacing={6}>
                <Button colorScheme="blue" type="submit">
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

                <NextLink href="/" passHref>
                  <Button as="a" colorScheme="teal">
                    Acesse conta
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
