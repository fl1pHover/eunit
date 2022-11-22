import React from "react";

import Title from "@/lib/Title";
import { ContainerX } from "@/lib/Container";
import { FooterText } from "@/components/footer/footerLink";

const Bottom = () => {
  return (
    <div className="py-3 border-t border-gray-200">
      <ContainerX>
        <div className="flex md:flex-row flex-col md:items-center justify-between">
          <Title classname="text-xl font-bold text-gray-900">Bom.mn</Title>
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
