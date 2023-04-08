import { useAuth } from '@/context/auth';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Center, Flex, Image } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import DashStatus from './dashStatus';

// user image
// main dashboard layout

const Dashboard = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { logout } = useAuth();
  const user = getCookie('user');
  const bookmark = getCookie('bookmarks');
  const handleClick = () => {
    setIsDisabled(!isDisabled);
  };
  console.log(bookmark);
  return (
    <div
      className={mergeNames(
        'rounded-xl shadow-xl ',
        STYLES.flexBetween,
        'flex-col text-[14px] bg-mainBlossom relative',
        'p-5 md:p-10 min-w-[250px] w-[300px] md:h-[70vh] h-auto'
      )}
    >
      <div className={mergeNames(STYLES.flexBetween, 'flex-col w-full')}>
        <Center flexDirection={'column'}>
          <Image
            src={
              user?.profileImg ??
              'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png'
            }
            className="w-[100px] aspect-square rounded-full object-cover"
            alt="profile "
          />
        </Center>

        {/* <button
          onClick={handleClick}
          disabled
          className="absolute cursor-pointer top-2 right-2 p-2 text-[20px] text-white bg-teal-600 rounded-[10px]"
        >
          <AiOutlineEdit />
        </button> */}
        {user && (
          <DashStatus
            agent={JSON.parse(user)}
            phone={JSON.parse(user)?.phone}
            username={JSON.parse(user)?.username}
            ads={JSON.parse(user)?.ads?.length}
            marks={JSON.parse(bookmark)?.length}
          />
        )}
      </div>

      {/* Logout button */}
      <button
        className="mt-5 py-3 w-full border-t border-t-[#a6c4d4] group"
        onClick={() => logout()}
      >
        <Flex className="items-center gap-3 font-bold text-white ">
          <FiLogOut className="text-[18px] group-hover:scale-110 duration-200" />
          <p className="duration-200 group-hover:translate-x-2">Гарах</p>
        </Flex>
      </button>
    </div>
  );
};

export default Dashboard;
