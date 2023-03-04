import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaPhoneAlt } from 'react-icons/fa';

const UserInfo = ({ phone, username, avatar, id }) => {
  const router = useRouter();
  return (
    <div
      className={mergeNames(
        STYLES.blueButton,
        // 'bg-blue-600 group-hover:bg-red-500',
        'flex items-center justify-between p-2 gap-10 col-span-full text-md mb-3'
      )}
    >
      <button
        className={mergeNames(
          'flex items-center gap-5 w-full justify-start group'
        )}
        onClick={() => router.push(`/account/${id}`)}
      >
        <Avatar src={avatar} size={{ base: 'sm', lg: 'md' }} />

        {/* //TODO: User name */}

        <p className="text-lg">{username}</p>
      </button>
      <button
        //TODO: User number
        onClick={() => router.push(`tel:${phone}`)}
        className={mergeNames(
          STYLES.flexCenter,
          'relative z-10',
          'items-center gap-1 bg-white text-blue-600 p-2 rounded-full cursor-default'
        )}
      >
        <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
      </button>
    </div>
  );
};

export default UserInfo;
