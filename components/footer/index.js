import React from "react";

import { ContainerX } from "@/lib/Container";

import LinkGrid from "@/components/footer/linkGrid";
import ContactGrid from "@/components/footer/contactGrid";
import Bottom from "@/components/footer/bottom";
import { useBreakpoints } from "@/hooks/index";

const Footer = () => {
  const pt = useBreakpoints();
  console.log("pt", pt);
  return (
    <section className="bg-white">
      <ContainerX>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 xs:grid-cols-2 grid-cols-1 sm:gap-10 gap-5 md:py-10 py-5">
          <LinkGrid />
          <ContactGrid />
        </div>
      </ContainerX>
      <Bottom />
    </section>
  );
};

export default Footer;
