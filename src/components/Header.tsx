import { Box, Button, Flex, HStack, IconButton, Spacer } from "@chakra-ui/react";
import { AiOutlineReload } from "react-icons/ai";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
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

  const reload = () => {
    window.location.reload();
  };

  return (
    <Flex w="100vw" h="20">
      <Flex
        as="header"
        bg="gray.100"
        position="fixed"
        top={0}
        width="full"
        shadow="sm"
        py={4}
        px={8}
      >
        <Spacer />
        <Box>
          <HStack>
            <IconButton
              aria-label="reload"
              icon={<AiOutlineReload/>}
              isRound
              onClick={reload}
            />
            {user ? (
              <IconButton
                aria-label="logout"
                icon={<FaSignOutAlt/>}
                isRound
                onClick={logout}
              />
            ) : (
              <IconButton
                aria-label="login"
                icon={<FaSignInAlt/>}
                isRound
                onClick={login}
              />
            )}
          </HStack>
        </Box>
      </Flex>
    </Flex>
  )
}
