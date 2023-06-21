import React from "react";

import { GrInstagram } from "react-icons/gr";
import { BsFacebook, BsTwitter, BsYoutube } from "react-icons/bs";

const footerIcon = [
  {
    Icon: (props) => <BsFacebook {...props} />,
    href: "https://www.facebook.com/BOMMLLC",
  },
  // {
  //   Icon: (props) => <GrInstagram {...props} />,
  //   href: "instagram.com",
  // },
  // {
  //   Icon: (props) => <BsTwitter {...props} />,
  //   href: "twitter.com",
  // },
  // {
  //   Icon: (props) => <BsYoutube {...props} />,
  //   href: "youtube.com",
  // },
];

export default footerIcon;
