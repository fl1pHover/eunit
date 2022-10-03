import { Container } from "@chakra-ui/react";
import React from "react";

const MainContainer = ({ children }) => {
     return (
          <Container maxW={{ base: "90%", lg: "90%", xl: "80%" }}>
               {children}
          </Container>
     );
};

export default MainContainer;
