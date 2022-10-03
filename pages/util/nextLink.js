import React from "react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

const ChakraLink = ({ children, href }) => {
     return (
          <NextLink href={href} passHref>
               <Link>{children}</Link>
          </NextLink>
     );
};

export default ChakraLink;
