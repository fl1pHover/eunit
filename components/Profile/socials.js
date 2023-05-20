import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Flex, Image } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { Fragment } from "react";

const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Socials = ({ edit, socials, setSocials }) => {
  const [urls, setUrls] = useState(socials);

  return (
    <>
      <div className="col-span-full">
        <h2 className="text-[20px] font-bold">Сошиал хаягууд</h2>
        <div
          className={mergeNames(
            edit ? "flex flex-col gap-3" : STYLES.flexBetween,
            "mt-4",
            edit && "animate-pin"
          )}
        >
          {socials?.map((s, i) => {
            return (
              <div
                key={i}
                className={mergeNames(s.url == "" && !edit ? "hidden" : "")}
              >
                <Link href={s.url != undefined ? s.url : ""} passHref>
                  <a
                    className={mergeNames(
                      s.url == "" ? "pointer-events-none" : ""
                    )}
                    target="_blank"
                  >
                    <Flex alignItems="center" gap={2}>
                      {/* <BsFacebook className="text-blue-600" /> */}
                      <p className="md:text-[16px] text-[12px] font-bold">
                        {capitalizeFirst(s.name)}
                      </p>
                      <Image
                        src={
                          `./utils/socials/` + capitalizeFirst(s.name) + `.svg`
                        }
                        alt="social icon"
                        className="w-[30px]"
                      />
                    </Flex>
                  </a>
                </Link>
                {edit && (
                  <input
                    type="text"
                    onChange={(e) => {
                      switch (i) {
                        case 0:
                          setSocials([
                            {
                              name: "facebook",
                              url: e.target.value,
                            },
                            {
                              name: "instagram",
                              url: socials?.[1]?.url,
                            },
                            {
                              name: "telegram",
                              url: socials?.[2]?.url,
                            },
                          ]);
                          break;
                        case 1:
                          setSocials([
                            {
                              name: "facebook",
                              url: socials?.[0]?.url,
                            },
                            {
                              name: "instagram",
                              url: e.target.value,
                            },
                            {
                              name: "telegram",
                              url: socials?.[2]?.url,
                            },
                          ]);
                          break;
                        case 0:
                          setSocials([
                            {
                              name: "facebook",
                              url: socials?.[0]?.url,
                            },
                            {
                              name: "instagram",
                              url: socials?.[1]?.url,
                            },
                            {
                              name: "telegram",
                              url: e.target.value,
                            },
                          ]);
                          break;
                      }
                    }}
                    key={i}
                    className={mergeNames(STYLES.input, "w-full ")}
                    placeholder={s.url}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Socials;
