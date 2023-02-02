import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import ProfileInput from '@/components/Profile/profileInput';
import Socials from '@/components/Profile/socials';
import mergeNames from '@/util/mergeNames';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GroupLayout = ({ title, children, className = '' }) => (
  <div className={mergeNames('flex flex-col justify-start gap-3', className)}>
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">{children}</div>
  </div>
);

const Profile = ({ user }) => {
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const [agent, setAgent] = useState(
    user?.userType == 'default'
      ? 'Энгийн'
      : user?.userType == 'agent'
      ? 'Агент'
      : 'Байгууллага' ?? 'Энгийн'
  );
  const router = useRouter();

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
          <ProfileInput edit={edit} ph={user?.username} item="username" />
        </GroupLayout>

        <GroupLayout title="Утас">
          <ProfileInput type="tel" ph={user?.phone} item="phone" edit={edit} />
        </GroupLayout>

        <GroupLayout title="Хэрэглэгчийн төрөл" className="">
          <div className="flex flex-row justify-center gap-4">
            {['Энгийн', 'Агент', 'Байгууллага'].map((text, id) => {
              const isSelected = text === agent;
              return (
                <ButtonSelectItem
                  key={id}
                  text={text}
                  isSelected={isSelected}
                  onClick={() => setAgent(text)}
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

        <Socials />

        {/* //TODO: Burgteltei email ni haragdaj bdgaar ghde disabled eniig yahav hereggui gevel arilgachna */}

        <GroupLayout title="Бүртгэлтэй Имэйл" className="col-span-full">
          <p className="italic ">{user?.email}soko-bishu@yahoo.com</p>
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
