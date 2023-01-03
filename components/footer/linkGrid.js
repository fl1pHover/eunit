import React from "react";

import Title from "../../lib/Title";
import footerData from "./footerData";
import FooterLink from "./footerLink";

const LinkGrid = () => {
  return (
    <React.Fragment>
      {footerData.map((d, index) => {
        return (
          <div key={index} className="">
            <Title>{d.title}</Title>
            {d.footerItem &&
              d.footerItem.map((a, i) => {
                return (
                  <div key={i} className="py-[2px]">
                    <FooterLink href={a.href}>{a.text}</FooterLink>
                  </div>
                );
              })}
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default LinkGrid;
