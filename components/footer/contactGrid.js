import React from "react";
import Link from "next/link";

import Title from "../../lib/Title";
import FooterLink, { FooterText } from "./footerLink";
import footerIcon from "./footerIcons";

const ContactGrid = () => {
  return (
    <React.Fragment>
      <div>
        <Title>Хаяг</Title>
        <FooterLink href="https://goo.gl/maps/LkMjLdhSTbNKoGqx7">
          Үндсэн хуулийн гудамж 2-р хороо, Баянгол дүүрэг, Улаанбаатар хот,
          Монгол улс, Рокмон Бюлдинг - 1003 тоот
        </FooterLink>
      </div>
      <div>
        <Title>Холбоо барих</Title>
        <FooterText>Утас: 9599-2333</FooterText>
        <FooterText>bomarketm@gmail.com</FooterText>

        <div className="flex flex-row items-center gap-4 py-4">
          {footerIcon.map(({ ...props }, index) => {
            return (
              <Link href={props.href} key={index}>
                <a target="_blank">
                  <props.Icon
                    size={20}
                    className="transition-all ease-in-out hover:text-blue-600 hover:scale-125"
                  />
                </a>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <Title>Апп татах</Title>
        <FooterText>Coming soon...</FooterText>
        {/* <Image src="./utils/download-store.png" alt="app stores" /> */}
      </div>
    </React.Fragment>
  );
};

export default ContactGrid;
