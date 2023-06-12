import Link from "next/link";
import React from "react";

const FooterLink = (props) => {
  return (
    <Link href={props.href} className="">
      <a
        target="_blank"
        className="text-[13px] hover:text-blue-700 cursor-pointer font-semibold text-gray-500"
      >
        {props?.children ?? ""}
      </a>
    </Link>
  );
};

export default FooterLink;

export const FooterText = (props) => {
  return (
    <p className="text-[13px] hover:text-blue-700  font-medium text-gray-500">
      {props?.children ?? ""}
    </p>
  );
};
// export const FooterTitle = (props) => {
//   return <Title classname="text-base font-bold">{props.children}</Title>;
// };
