import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import ProfileInput from '@/components/Profile/profileInput';
import Socials from '@/components/Profile/socials';
import urls from '@/constants/api';
import mergeNames from '@/util/mergeNames';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GroupLayout = ({ title, children, className = '' }) => (
  <div className={mergeNames('flex flex-col justify-start gap-3', className)}>
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">{children}</div>
  </div>
);

const Profile = ({ user }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    username: user?.username,
    phone: user?.phone,
    userType: user?.userType,
  });
  const router = useRouter();
  const [socials, setSocials] = useState([]);
  const handleEdit = async () => {
    setIsLoading(true);

    if (edit) {
      const token = getCookie('token');
      console.log(userData);
      try {
        await axios
          .put(
            `${urls['test']}/user`,
            {
              username: userData.username,
              phone: userData.phone,
              userType: userData.userType,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((d) => router.reload());
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setEdit(!edit);
      }
    }
    setEdit(!edit);
    setIsLoading(false);
  };

  return (
    <div className="flex-col h-full">
      <div
        className={mergeNames(
          'grid grid-cols-1 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2',
          'gap-y-6 gap-x-10',
          'py-5'
        )}
      >
        <GroupLayout title="Овог Нэр">
          <ProfileInput
            edit={edit}
            ph={userData.username}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, username: e.target.value }))
            }
            item="username"
          />
        </GroupLayout>

        <GroupLayout title="Утас">
          <ProfileInput
            type="tel"
            ph={userData.phone}
            item="phone"
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, phone: e.target.value }))
            }
            edit={edit}
          />
        </GroupLayout>

        <GroupLayout title="Хэрэглэгчийн төрөл" className="">
          <div
            className={mergeNames(
              'flex flex-row justify-center gap-4',
              edit ? ' ' : 'cursor-not-allowed'
            )}
          >
            {['default', 'agent', 'orgazation'].map((text, id) => {
              return (
                <ButtonSelectItem
                  key={id}
                  text={id == 0 ? 'Энгийн' : id == 1 ? 'Агент' : 'Байгууллага'}
                  isSelected={userData.userType == text}
                  onClick={() =>
                    setUserData((prev) => ({ ...prev, userType: text }))
                  }
                  edit={edit}
                  disabled={edit ? false : true}
                />
              );
            })}
          </div>
        </GroupLayout>

        <GroupLayout title="Төрсөн өдөр">
          <ProfileInput type="date" item="date" edit={edit} />
        </GroupLayout>

        <Socials edit={edit} />

        {/* //TODO: Burgteltei email ni haragdaj bdgaar ghde disabled eniig yahav hereggui gevel arilgachna */}

        <GroupLayout title="Бүртгэлтэй Имэйл" className="col-span-full">
          <p className="italic ">{user?.email}</p>
        </GroupLayout>
      </div>

      <button
        className={mergeNames(
          // 'hidden',
          'text-white  transition-all ease-linear',
          'float-right mt-5 px-5 py-2 font-bold w-32 rounded-[30px]',
          edit ? 'bg-mainBlue hover:bg-blue-900' : 'bg-red-500'
        )}
        onClick={handleEdit}
      >
        <p>{edit ? 'Хадгалах' : 'Засварлах'}</p>
      </button>
    </div>
  );
};

export default Profile;
