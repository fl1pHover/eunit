import { Container } from "@chakra-ui/react";
import React from "react";

const BarContainer = ({ children, py }) => {
     return (
          <Container maxW={{ base: "90%", lg: "95%", xl: "90%" }} py={py}>
               {children}
          </Container>
     );
};

export default BarContainer;
