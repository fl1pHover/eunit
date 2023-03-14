import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Avatar } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaPhoneAlt } from 'react-icons/fa';
import { RiMailOpenFill } from 'react-icons/ri';

// const UserInfo = ({ phone, username, avatar, id }) => {
//   const router = useRouter();
//   return (
//     <div
//       className={mergeNames(
//         STYLES.blueButton,
//         // 'bg-blue-600 group-hover:bg-red-500',
//         'flex items-center justify-between p-2 gap-10 col-span-full text-md mb-3'
//       )}
//     >
//       <button
//         className={mergeNames(
//           'flex items-center gap-5 w-full justify-start group'
//         )}
//         onClick={() => router.push(`/account/${id}`)}
//       >
//         <Avatar src={avatar} size={{ base: 'sm', lg: 'md' }} />

//         {/* //TODO: User name */}

//         <p className="text-lg">{username}</p>
//       </button>
//       <button
//         //TODO: User number
//         onClick={() => router.push(`tel:${phone}`)}
//         className={mergeNames(
//           STYLES.flexCenter,
//           'relative z-10',
//           'items-center gap-1 bg-white text-blue-600 p-2 rounded-full cursor-default'
//         )}
//       >
//         <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
//       </button>
//     </div>
//   );
// };
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
            'items-center gap-1 bg-white text-blue-600 p-2 rounded-md hover:bg-blue-600 hover:text-white transition-all ease-in-out border border-blue-600'
          )}
        >
          <RiMailOpenFill />:<p className="whitespace-nowrap"> {email}</p>
        </button>
      </div>
    </div>
  );
};

export default UserInfo;
