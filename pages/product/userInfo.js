import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaPhoneAlt } from 'react-icons/fa';

const UserInfo = ({ phone, username, agent, avatar, email, id }) => {
  const router = useRouter();
  return (
    <div
      className={mergeNames(
        'flex flex-col items-center justify-between p-2 text-md w-[300px] gap-3'
      )}
    >
      <div className="flex items-center justify-start w-full gap-5 ">
        <Avatar
          src={avatar}
          size={{ base: 'md', lg: 'lg' }}
          onClick={() => router.push(`/account/${id}`)}
          className="cursor-pointer"
        />
        <div className="flex flex-col">
          <p
            className="text-lg font-bold"
            onClick={() => router.push(`/account/${id}`)}
          >
            {username}
          </p>
          <p className="text-gray-500 text-md">{agent} </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-3 font-semibold">
        <button
          onClick={() => router.push(`tel:${phone}`)}
          className={mergeNames(
            STYLES.flexCenter,
            'relative z-10',
            'items-center gap-1 bg-white text-blue-600 p-2 rounded-md hover:bg-blue-600 hover:text-white transition-all ease-in-out border border-blue-600'
          )}
        >
          <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
        </button>
        <button
          onClick={() => router.push(`mailto:${email}`)}
          className={mergeNames(
            STYLES.flexCenter,
            'relative z-10',
            'items-center gap-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900 hover:text-white transition-all ease-in-out border border-blue-600 hover:border-blue-900'
          )}
        >
          {/* <RiMailOpenFill />: */}
          <p className="whitespace-nowrap"> Имэйл илгээх</p>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
