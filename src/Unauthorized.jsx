import { Container, Heading, Text } from "@chakra-ui/react";
import React from "react";

function Unauthorized() {
  return (
    <Container
      maxW={["container.sm", "container.md", "container.lg", "container.xl"]}
    >
      <Heading>!Error Status Code : 404 (Unauthorized)</Heading>
    </Container>
  );
}

export default Unauthorized;
