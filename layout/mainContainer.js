import { Container } from "@chakra-ui/react";

const MainContainer = ({ children, py }) => {
     return (
          <Container
               maxW={{ base: "100%", lg: "90%", xl: "85%" }}
               py={py}
               paddingInlineStart={{ base: 0, md: 4 }}
               paddingInlineEnd={{ base: 0, md: 4 }}
          >
               {children}
          </Container>
     );
};

export default MainContainer;
