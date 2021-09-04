import { Box, Button, Flex, IconButton, Spacer } from "@chakra-ui/react";
import React from "react";

export default function Header() {
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
          <Button disabled colorScheme="blue">
            保存済み
          </Button>
        </Box>
      </Flex>
    </Flex>
  )
}
