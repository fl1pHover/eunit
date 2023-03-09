import React from "react";

import Title from "@/lib/Title";
import { NavContainer } from "@/lib/Container";
import { FooterText } from "./footerLink";

const Bottom = () => {
  return (
    <div className="py-3 border-t border-gray-200">
      <NavContainer>
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <Title classname="text-xl font-bold text-gray-900">Bom.mn</Title>
          <FooterText>
            Copyright&copy;
            {new Date().getFullYear()}&nbsp;Зохиогчийн эрхээр хамгаалагдсан
          </FooterText>
        </div>
      </NavContainer>
    </div>
  );
};

export default Bottom;
