import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
const Socials = ({ edit, socials, setSocials }) => {
  return (
    <>
      <div className="col-span-full">
        <h2 className="text-[20px] font-bold">Сошиал хаягууд</h2>
        <div
          className={mergeNames(
            edit ? 'flex flex-col gap-3' : STYLES.flexBetween,
            'mt-4',
            edit && 'animate-pin'
          )}
        >
          {socials?.map((s, i) => {
            return (
              <div key={i}>
                <Link target="_blank" href={s.url} passHref>
                  <a className={mergeNames(edit && 'pointer-events-none')}>
                    <Flex alignItems="center" gap={2}>
                      {/* <BsFacebook className="text-blue-600" /> */}
                      <p className="md:text-[16px] text-[12px] font-bold">
                        {capitalizeFirst(s.name)}
                      </p>
                      <Image
                        src={`./utils/socials/` + s.name + `.svg`}
                        alt="social icon"
                        className="w-[30px]"
                      />
                    </Flex>
                  </a>
                </Link>
                {edit && (
                  <input
                    type="text"
                    onChange={(e) => (socials[i].url = e.target.value)}
                    key={i}
                    className={mergeNames(STYLES.input, 'w-full')}
                    placeholder={s.url + 'userId'}
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
