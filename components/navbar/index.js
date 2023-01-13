import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import UpperNav from "./upper";
import CategoryBottom from "./bottom";
import Higher from "./higher";

const Navbar = ({ data }) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <>
      <Higher />
      <Box
        top="0"
        id="navbar"
        zIndex={"20"}
        as={"section"}
        pos={sticky ? "sticky" : "relative"}
      >
        <UpperNav />
        <CategoryBottom {...{ sticky }} data={data} />
      </Box>
    </>
  );
};

export default Navbar;
