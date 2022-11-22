import { Container } from "@chakra-ui/react";
import React from "react";

const MainContainer = ({ children, py }) => {
  return (
    <Container maxW={{ base: "90%", lg: "90%", xl: "80%" }} py={py}>
      {children}
    </Container>
  );
};

export default MainContainer;
