import React from "react";
import Image from "next/image";
import Link from "next/link";

const NavLogo = ({ size }) => {
  return (
    <React.Fragment>
      <div className="cursor-pointer md:block hidden">
        <Link href="/">
          <a className="">
            <Image
              src="/images/logo/bom-blue-text.png"
              alt="BOM logo"
              width={size.width}
              height={size.height}
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
      <div className="cursor-pointer md:hidden block">
        <Link href="/">
          <a className="">
            <Image
              src="/images/logo/bom-white-text.png"
              alt="BOM logo"
              width={size.width}
              height={size.height}
              objectFit="contain"
            />
          </a>
        </Link>
      </div>
    </React.Fragment>
  );
};

export default NavLogo;
