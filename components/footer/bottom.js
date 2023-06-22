import React from "react";

import Title from "@/lib/Title";
import { ContainerX } from "@/lib/Container";
import { FooterText } from "./footerLink";

const Bottom = () => {
  return (
    <div className="py-3 border-t border-gray-200">
      <ContainerX>
        <div className="flex flex-col justify-between md:flex-row md:items-center">
          <Title classname="text-xl font-bold text-gray-900">Eunit.mn</Title>
          <FooterText>
            Copyright&copy;
            {new Date().getFullYear()}&nbsp;Зохиогчийн эрхээр хамгаалагдсан
          </FooterText>
        </div>
      </ContainerX>
    </div>
  );
};

export default Bottom;
