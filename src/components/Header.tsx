import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import { auth, provider } from "../firebase";
import { signInWithRedirect, User } from 'firebase/auth';

type Props = {
  user: User;
};

export default function Header(props: Props) {
  const { user } = props;
  const login = () => {
    signInWithRedirect(auth, provider);
  };

  const logout = () => {
    auth.signOut();
  };

  return (
    <Flex bg="gray.100" w="100vw" h="20">
      <Flex
        as="header"
        position="fixed"
        top={0}
        width="full"
        shadow="sm"
        py={4}
        px={8}
      >
        <Spacer />
        <Box>
          {user ? (
            <div>
              <Button onClick={logout}>Google Logout</Button>
            </div>
          ) : (
            <Button onClick={login}>Google Login</Button>
          )}
        </Box>
      </Flex>
    </Flex>
  )
}
