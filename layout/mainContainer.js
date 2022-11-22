import { Container } from "@chakra-ui/react";

const MainContainer = ({ children, py }) => {
     return (
          <Container maxW={{ base: "100%", lg: "90%", xl: "85%" }} py={py}>
               {children}
          </Container>
     );
};

export default MainContainer;
