import { FaHeart } from 'react-icons/fa';

import urls from '@/constants/api';
import { getUser, stopPropagation } from '@/context/functions';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { BiGitCompare } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from 'store/slice/bookmark';
import { setCompare } from 'store/slice/compare';
const AdCardButton = ({ id, adId, cateId }) => {
  const toast = useToast();
  const { user } = useSelector((state) => state.user);
  const token = getCookie('token');
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const { compare } = useSelector((state) => state.compare);
  const dispatch = useDispatch();
  const router = useRouter();
  if (!user && token) {
    getUser();
  }
  const addToBookmark = async () => {
    if (bookmarks != undefined) {
      dispatch(setBookmark(adId));
      if (bookmarks.includes(adId)) {
        toast({
          title: 'Зар хүслээс хасагдлаа.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Зар хүсэлд нэмэгдлээ.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Та нэвтэрнэ үү',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const getCompareAd = async () => {
    compare.map((c) => {
      console.log(c.subCategory._id, cateId);
    });
    if (compare != undefined && compare.length < 4) {
      if (
        compare.find((c) => c.subCategory._id != cateId || c.id == adId) ==
        undefined
      ) {
        await axios
          .get(`${urls['test']}/ad/id/${id}`)
          .then((d) => dispatch(setCompare(d.data)));
      } else {
        toast({
          title: 'Өөр төрлийн зар эсвэл сонгогдсон зар байна.',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: 'Дүүрсэн байна.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const cardIcon = {
    div: 'flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group-a hover:bg-slate-200  shadow-md',
    icon: 'md:p-2 p-[5px] h-7 w-7 md:w-8 md:h-8',
  };

  return (
    <div className="relative flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={(e) => {
            stopPropagation(e);
            addToBookmark();
          }}
        >
          <FaHeart
            className={mergeNames(
              'hover:text-red-400 ',
              cardIcon.icon,

              bookmarks && user && bookmarks.find((b) => b == adId) != undefined
                ? 'text-red-500/90'
                : 'text-slate-200/90'
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={(e) => {
            stopPropagation(e);
            getCompareAd();
          }}
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
