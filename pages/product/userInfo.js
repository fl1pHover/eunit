import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Avatar } from '@chakra-ui/react';
import Link from 'next/link';
import { FaPhoneAlt } from 'react-icons/fa';

const UserInfo = ({ user, phone, username, avatar }) => {
  return (
    <div
      className={mergeNames(
        STYLES.blueButton,
        'flex items-center justify-between p-2 gap-10 col-span-full text-md mb-3'
      )}
    >
      <Link href={`/account/${user}`}>
        <a
          className={mergeNames('flex items-center gap-5 w-full justify-start')}
        >
          <Avatar src={avatar} size={{ base: 'sm', lg: 'md' }} />

          {/* //TODO: User name */}

          <p>{username}</p>
        </a>
      </Link>
      <button
        //TODO: User number
        onClick={() => router.push(`tel:${phone}`)}
        className={mergeNames(
          STYLES.flexCenter,
          'relative z-10',
          'items-center gap-1 bg-white text-blue-600 p-2 rounded-full'
        )}
      >
        <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
      </button>
    </div>
  );
};

export default UserInfo;
