import AdContent from '@/components/home/adContent';
import { capitalizeFirst } from '@/components/Profile/socials';
import MainContainer from '@/layout/mainContainer';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Image } from '@chakra-ui/react';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaPhoneAlt } from 'react-icons/fa';
import urls from '../../constants/api';

const Accounts = ({ propUser }) => {
  const [ads, setAds] = useState([]);
  const getAds = async () => {
    await axios
      .post(`${urls['test']}/ad/many/0/false`, propUser.ads)
      .then((d) => {
        setAds(d.data.ads);
      });
  };

  useEffect(() => {
    if (propUser) getAds();
  }, [propUser]);
  return (
    <MainContainer py={5}>
      <div className={mergeNames('flex flex-col gap-3 ')}>
        <div
          className={mergeNames(
            'w-full p-3 sm:p-6 md:p-10 bg-white shadow-xl rounded-xl',
            'flex flex-row'
          )}
        >
          <div
            className={mergeNames(
              STYLES.flexCenter,
              'flex-col w-full gap-4 md:gap-16 sm:flex-row'
            )}
          >
            <Image
              src={
                propUser?.profileImg ??
                'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
              }
              alt="User"
              className={mergeNames(
                'h-[150px] w-[150px] border border-gray-300',
                'rounded-full aspect-square object-cover'
              )}
            />

            <div className="flex flex-col w-full gap-5">
              {/* //TODO: Profile name, agent type */}
              <div
                className={mergeNames(
                  STYLES.flexBetween,
                  'xs:flex-row flex-col sm:justify-between justify-around items-center gap-2 text-center xs:text-left'
                )}
              >
                <div>
                  <h1 className="text-xl font-bold md:text-3xl">
                    {propUser.username}
                  </h1>
                  <h3 className="font-bold text-blue-600 capitalize text-md">
                    {propUser.userType == 'default'
                      ? 'Энгийн'
                      : propUser.userType == 'agent'
                      ? 'Агент'
                      : propUser.userType == 'organization'
                      ? 'Байгууллага'
                      : propUser.userType}
                  </h3>
                </div>
                <p
                  className={mergeNames(
                    STYLES.flexCenter,
                    'items-center',
                    'px-4 py-2 text-md md:text-lg font-bold text-white bg-blue-600 rounded-md cursor-pointer gap-1 md:gap-2'
                  )}
                >
                  <FaPhoneAlt /> +976 {propUser.phone}
                </p>
              </div>

              {/* //TODO: Social Hayg */}
              <Socials />
            </div>
          </div>
        </div>
        {ads.length > 0 && <AdContent data={ads} />}
      </div>
    </MainContainer>
  );
};
export default Accounts;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;

  const res = await fetch(`${urls['test']}/user/${slug}`);
  const user = await res.json();
  return {
    props: {
      propUser: user,
    },
  };
}

const Socials = ({ propUser }) => {
  const [socials, setSocials] = useState([
    {
      name: 'facebook',
      url: propUser?.socials[0]?.url ?? 'https://www.facebook.com/',
    },
    {
      name: 'instagram',
      url: propUser?.socials[1]?.url ?? 'https://www.instagram.com',
    },
    {
      name: 'telegram',
      url: propUser?.socials[2]?.url ?? 'https://www.telegram.org/',
    },
  ]);

  return (
    <div className="grid flex-row grid-cols-2 gap-2 md:gap-5 xs:flex">
      {socials?.map((s, i) => {
        return (
          <Link href={s.url} key={i} target="_blank">
            <a
              className={mergeNames(
                STYLES.flexCenter,
                'items-center gap-2',
                'px-3 py-2 rounded-xl',
                'transition-all ease-in-out',
                'hover:bg-[#e3f2fd] hover:text-blue-500'

                // socials.length - 1 ? 'mr-5' : ''
              )}
            >
              <Image
                className="h-[30px] w-[30px]"
                src={`/utils/socials/` + capitalizeFirst(s.name) + `.svg`}
                alt="social icon"
              />
              <p className="font-bold text-md">{capitalizeFirst(s.name)}</p>
            </a>
          </Link>
        );
      })}
    </div>
  );
};
