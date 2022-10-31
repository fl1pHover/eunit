import { Stack } from "@chakra-ui/react";
import React from "react";

const FilterStack = ({ children }) => {
     return (
          <Stack borderBottom={"2px solid "} borderColor="bgGrey" py={5}>
               {children}
          </Stack>
     );
};
export default FilterStack;
