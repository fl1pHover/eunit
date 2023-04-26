import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { getCookie } from 'cookies-next';
import { Suspense, useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsGrid1X2 } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';

// Pro deerh dashboard stats
// Niit zar
// niit bookmark

const DashStatus = ({ agent, username, phone, ads }) => {
  const bookmark = getCookie('bookmarks');
  const [mark, setMark] = useState(0);
  useEffect(() => {
    if (bookmark) setMark(JSON.parse(bookmark).length);
  }, [bookmark]);
  return (
    <div
      className={mergeNames(
        'flex flex-col items-start w-full',
        'text-[#a6c4d4]',
        'mt-5 gap-y-8'
      )}
    >
      <div className={mergeNames(STYLES.flexBetween, 'w-full')}>
        <div>
          <p className="font-bold">Хэрэглэгч</p>
          <Suspense fallback={<p>loading</p>}>
            <p
              className={`text-${
                agent.status == 'pending'
                  ? 'yellow'
                  : agent.status == 'active'
                  ? 'green'
                  : 'red'
              }-400`}
            >
              {agent?.userType == 'default'
                ? 'Энгийн'
                : agent?.userType == 'agent'
                ? 'Агент'
                : agent?.userType == 'organization'
                ? 'Байгууллага'
                : agent?.userType}
            </p>{' '}
          </Suspense>
        </div>
        <div>
          <p className="font-bold">Утас</p>
          <p className="">{phone}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4 ">
          <BiUser className="text-[18px]" />
          <p className="">{username}</p>
        </div>
        <div className="flex items-center gap-4">
          <BsGrid1X2 className="text-[18px]" />
          <p>{ads} - Нийт зар</p>
        </div>
        {mark != 0 && (
          <div className="flex items-center gap-4">
            <FiHeart className="text-[18px]" />
            <p className="">{mark} - Нийт хүсэл</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashStatus;
