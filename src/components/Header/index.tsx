import { RiMenuLine } from 'react-icons/ri';

import { Flex, Icon, IconButton, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';

export function Header() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

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
        <NotificationsNav />

        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}
