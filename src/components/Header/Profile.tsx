import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

import { useFirebase } from '~/hooks/AuthContext';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  const { userFire } = useFirebase();
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>{userFire.displayName}</Text>

          <Text color="gray.300" fontSize="sm">
            {userFire.email}
          </Text>
        </Box>
      )}

      <Avatar size="md" name={userFire.displayName} />
    </Flex>
  );
}
