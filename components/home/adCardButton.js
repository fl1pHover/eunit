import React from 'react';
import { FaHeart } from 'react-icons/fa';

import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { BiGitCompare } from 'react-icons/bi';
const AdCardButton = ({ id, adId }) => {
  const { compareAds, setCompareAds } = useAuth();
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const token = getCookie('token');
  const router = useRouter();
  const user = getCookie('user');
  const addToBookmark = async () => {
    try {
      await axios
        .post(
          `${urls['test']}/bookmark/ad`,
          {
            adId: adId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((d) => {
          if (d.data) {
            toast({
              title: 'Зар хүсэлд нэмэгдлээ.',
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Зар хүслээс хасагдлаа.',
              status: 'warning',
              duration: 5000,
              isClosable: true,
            });
          }
        });
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getCompareAd = async () => {
    try {
      await axios.get(`${urls['test']}/ad/id/${id}`).then((d) => {
        if (compareAds.length <= 4) {
          if (compareAds.length > 0) {
            compareAds[0].subCategory._id == d.data.subCategory._id
              ? setCompareAds((prev) => [...prev, d.data])
              : toast({
                  status: `warning`,
                  title: `Ижил төрлийн зар сонгоно уу`,
                  duration: 1000,
                });
          } else {
            setCompareAds((prev) => [...prev, d.data]);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const cardIcon = {
    div: 'flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group-a hover:bg-slate-200 hidden sm:block ',
    icon: 'md:p-2 p-[2px] h-7 w-7 md:w-8 md:h-8',
  };

  return (
    <div className="flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={() => {
            setIsLiked(true);
            addToBookmark();
          }}
        >
          <FaHeart
            className={mergeNames(
              'hover:text-red-400 ',
              cardIcon.icon,
              isLiked ||
                (user &&
                  JSON.parse(user).bookmarks.find((b) => b == adId) !=
                    undefined)
                ? 'text-red-500/90'
                : 'text-slate-200/90'
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={() => getCompareAd()}
        >
          <BiGitCompare
            className={mergeNames('text-blue-700', cardIcon.icon)}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default AdCardButton;
