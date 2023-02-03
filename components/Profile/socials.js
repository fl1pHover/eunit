import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';

const Socials = ({ edit }) => {
  const socials = [
    { social: 'Facebook', href: 'https://www.instagram.com/' },
    { social: 'Instagram', href: 'https://www.instagram.com/' },
    { social: 'Telegram', href: 'https://www.instagram.com/' },
  ];
  return (
    <>
      <div className="col-span-full">
        <h2 className="text-[20px] font-bold">Сошиал хаягууд</h2>
        <div
          className={mergeNames(
            STYLES.flexBetween,
            'mt-4',
            edit && 'animate-pin'
          )}
        >
          {socials.map((s, i) => {
            return (
              <Link target="_blank" href={s.href} passHref key={i}>
                <a>
                  <Flex alignItems="center" gap={2}>
                    {/* <BsFacebook className="text-blue-600" /> */}
                    <p className="md:text-[16px] text-[12px] font-bold">
                      {s.social}
                    </p>
                    <Image
                      src={`./utils/socials/` + s.social + `.svg`}
                      alt="social icon"
                      className="w-[30px]"
                    />
                  </Flex>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Socials;
