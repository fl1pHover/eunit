import React from 'react';
import { FaHeart } from 'react-icons/fa';

import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { BiGitCompare } from 'react-icons/bi';
const AdCardButton = ({ id, adId }) => {
  const { compareAds, setCompareAds } = useAuth();
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const token = getCookie('token');
  let bookmarks = getCookie('bookmarks');
  const router = useRouter();
  const user = getCookie('user');
  const addToBookmark = async () => {
    bookmarks = getCookie('bookmarks');
    if (bookmarks && user && token) {
      if (JSON.parse(bookmarks).find((b) => b == adId) != undefined) {
        setIsLiked(false);
        let arr = [...JSON.parse(bookmarks)];
        arr = arr.filter((a) => a !== adId);

        setCookie('bookmarks', arr);
        toast({
          title: 'Зар хүслээс хасагдлаа.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        await axios.post(
          `${urls['test']}/bookmark/ad`,
          {
            adId: adId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        setIsLiked(true);
        let arr = [...JSON.parse(bookmarks)];
        arr.push(adId);
        setCookie('bookmarks', arr);
        toast({
          title: 'Зар хүсэлд нэмэгдлээ.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        await axios.post(
          `${urls['test']}/bookmark/ad`,
          {
            adId: adId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    }

    //   try {
    // } catch (err) {
    //   console.log(err.response.data.message);
    //   }
  };
  const getCompareAd = async () => {
    try {
      if (compareAds.length <= 4) {
        await axios.get(`${urls['test']}/ad/id/${id}`).then((d) => {
          console.log(compareAds);
          if (compareAds.length > 0) {
            compareAds[0].subCategory._id == d.data.subCategory._id
              ? compareAds.find((c) => c._id == d.data._id) == undefined
                ? setCompareAds((prev) => [...prev, d.data])
                : toast({
                    status: `warning`,
                    title: `Сонгогдсон зар байна`,
                    duration: 1000,
                  })
              : toast({
                  status: `warning`,
                  title: `Ижил төрлийн зар сонгоно уу`,
                  duration: 1000,
                });
          } else {
            if (compareAds.find((c) => c._id == d.data._id) == undefined) {
              setCompareAds((prev) => [...prev, d.data]);
            }
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const cardIcon = {
    div: 'flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group-a hover:bg-slate-200  shadow ',
    icon: 'md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8',
  };

  return (
    <div className="relative flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={() => {
            addToBookmark();
          }}
        >
          <FaHeart
            className={mergeNames(
              'hover:text-red-400 ',
              cardIcon.icon,
              isLiked ||
                (bookmarks &&
                  token &&
                  JSON.parse(bookmarks).find((b) => b == adId) != undefined)
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
