import React from "react";

import { ContainerX } from "@/lib/Container";

import LinkGrid from "./linkGrid";
import ContactGrid from "./contactGrid";
import Bottom from "./bottom";


const Footer = () => {
  // const pt = useBreakpoints();
  // console.log("pt", pt);
  return (
    <section className="bg-white ">
      <ContainerX>
        <div className="grid grid-cols-1 gap-5 py-5 lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-2 sm:gap-10 md:py-10">
          <LinkGrid />
          <ContactGrid />
        </div>
      </ContainerX>
      <Bottom />
    </section>
  );
};

export default Footer;
