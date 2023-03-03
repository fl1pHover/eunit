import React from 'react';
import { FaHeart } from 'react-icons/fa';

import urls from '@/constants/api';
import mergeNames from '@/util/mergeNames';
import { Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { BiGitCompare } from 'react-icons/bi';
import { useAuth } from '@/context/auth';
const AdCardButton = ({ id }) => {
  const {compareAds, setCompareAds} = useAuth()
  const toast = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const token = getCookie('token');
  const addToBookmark = async () => {
    try {
      console.log(id);
      await axios
        .post(
          `${urls['test']}/bookmark/ad`,
          {
            adId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((d) => console.log(d));
    } catch (err) {
      console.log(err.response.data.message);
    }
  };
  const getCompareAd = async () => {
    try {
      await axios.get(`${urls['test']}/ad/id/${id}`).then((d) => {
        if(compareAds.length <= 4) {
          if(compareAds.length > 0) {
            compareAds[0].subCategory._id == d.data.subCategory._id ? setCompareAds(prev => [...prev, d.data]) : toast('error')
          } else {
            setCompareAds(prev => [...prev, d.data])
          }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const cardIcon = {
    div: 'flex items-center justify-center transition-all duration-300 ease-in-out rounded-full bg-slate-200/40 group-a hover:bg-slate-200 hidden sm:block ',
    icon: 'md:p-2 p-[2px] h-7 w-7 md:w-8 md:h-8',
  };

  return (
    <div className="relative z-20 flex flex-row items-center space-x-2">
      <Tooltip label="Хадгалах">
        <button
          className={mergeNames(cardIcon.div)}
          onClick={() => {
            console.log('asdff');
            setIsLiked(true);
            toast({
              title: 'Хүсэл рүү нэмэгдлээ.',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
          }}
        >
          <FaHeart
            className={mergeNames(
              'hover:text-red-400 ',
              cardIcon.icon,
              isLiked ? 'text-red-500/90' : 'text-slate-200/90'
            )}
          />
        </button>
      </Tooltip>

      <Tooltip label="Харьцуулах">
        <button className={mergeNames(cardIcon.div)} onClick={() => getCompareAd()}>
          <BiGitCompare
            className={mergeNames('text-blue-700', cardIcon.icon)}
          />
        </button>
      </Tooltip>
    </div>
  );
};

export default AdCardButton;
