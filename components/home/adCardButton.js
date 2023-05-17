import React from 'react';
import { FaHeart } from 'react-icons/fa';

import { useAuth } from '@/context/auth';
import { stopPropagation } from '@/context/functions';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import { getCookie, setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { BiGitCompare } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { setBookmark } from 'store/slice/bookmark';
const AdCardButton = ({ id, adId, cateId }) => {
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isCompare, setIsCompare] = React.useState(false);

  let { comparison, setComparison } = useAuth();
  let comparisonCategory = getCookie('comparisonCategory');
  const { user } = useSelector((state) => state.user);
  const { bookmarks } = useSelector((state) => state.bookmarks);
  const dispatch = useDispatch();
  const router = useRouter();
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
    if (comparison && comparisonCategory != undefined) {
      if (
        comparison.length <= 5 &&
        comparison.find((b) => b == adId) == undefined
      ) {
        if (comparisonCategory == cateId) {
          setIsCompare(true);
          setCookie('comparisonCategory', cateId);
          setComparison((prev) => [...prev, adId]);
        } else {
          if (comparisonCategory == '') {
            setCookie('comparisonCategory', cateId);
            setIsCompare(true);
            setComparison((prev) => [...prev, adId]);
          } else {
            toast({
              status: `warning`,
              title: `Ижил төрлийн зар сонгоно уу`,
              duration: 1000,
            });
          }
        }
      } else {
        toast({
          status: `warning`,
          title: `Сонгогдсон зар байна`,
          duration: 1000,
        });
      }
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
              isLiked ||
                (bookmarks &&
                  user &&
                  bookmarks.find((b) => b == adId) != undefined)
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
