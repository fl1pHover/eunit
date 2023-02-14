import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';

const Socials = ({ edit }) => {
  const socials = [
    { social: 'Facebook', href: 'https://www.facebook.com/' },
    { social: 'Instagram', href: 'https://www.instagram.com/' },
    { social: 'Telegram', href: 'https://www.telegram.com/' },
  ];

  return (
    <>
      <div className="col-span-full">
        <h2 className="text-[20px] font-bold">Сошиал хаягууд</h2>
        <div
          className={mergeNames(
            edit ? 'block' : STYLES.flexBetween,
            'mt-4',
            edit && 'animate-pin'
          )}
        >
          {socials.map((s, i) => {
            return (
              <div key={i}>
                <Link target="_blank" href={s.href} passHref>
                  <a className={mergeNames(edit && 'pointer-events-none')}>
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
                {edit && (
                  <input
                    type="text"
                    key={i}
                    className={mergeNames(STYLES.input, 'w-full')}
                    placeholder={s.href + 'userId'}
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
