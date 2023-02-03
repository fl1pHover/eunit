import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { BiUser } from 'react-icons/bi';
import { BsGrid1X2 } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';

// Pro deerh dashboard stats
// Niit zar
// niit bookmark

const DashStatus = ({ agent, username, phone, ads, marks }) => {
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
          <p className="">{agent}</p>
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
          <p>
            {/* <span className="font-bold text-teal-500">35</span> */}
            {ads} - Нийт зар
          </p>
        </div>
        <div className="flex items-center gap-4">
          <FiHeart className="text-[18px]" />
          <p className="">
            {/* <span className="font-bold text-teal-500">35</span>  */}
            {marks} - Нийт хүсэл
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashStatus;
