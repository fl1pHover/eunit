import { Box } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
     return (
          <Box
               id="spinner"
               height={"100%"}
               pos="fixed"
               width={"100%"}
               bgColor="red"
               zIndex={"9999"}
          >
               Loading
          </Box>
     );
};

export default Loader;
