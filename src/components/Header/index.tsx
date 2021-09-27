import { RiMenuLine, RiLogoutCircleLine } from 'react-icons/ri';

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';
import NextLink from 'next/link';

import { useFirebase } from '~/hooks/AuthContext';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { handleLogout } = useFirebase();

  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          mr="2"
        ></IconButton>
      )}
      <Logo />
      <Flex align="center" ml="auto">
        <NextLink href="/" passHref>
          <IconButton
            aria-label="Log out"
            mr="1"
            size="sm"
            variant="link"
            colorScheme="gray"
            icon={<Icon as={RiLogoutCircleLine} fontSize="20" />}
            onClick={handleLogout}
          ></IconButton>
        </NextLink>

        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
