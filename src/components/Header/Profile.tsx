import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Kevin Bohry</Text>

          <Text color="gray.300" fontSize="sm">
            kevinportella@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Kevin Bohry" />
    </Flex>
  );
}
