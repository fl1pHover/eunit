import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import UpperNav from "@/components/navbar/upper";
import Bottom from "@/components/navbar/bottom";
import Higher from "@/components/navbar/higher";

const Navbar = ({ user, logout }) => {
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
        <UpperNav {...{ user, logout }} />
        <Bottom {...{ sticky }} />
      </Box>
    </>
  );
};

export default Navbar;
