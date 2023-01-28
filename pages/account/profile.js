import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import ProfileInput from '@/components/Profile/profileInput';
import mergeNames from '@/util/mergeNames';
import { useRouter } from 'next/router';
import { useState } from 'react';

const GroupLayout = ({ title, children, className = '' }) => (
  <div
    className={mergeNames(
      'flex flex-col justify-center gap-3 lg:max-w-[full] max-w-[350px]',
      className
    )}
  >
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">{children}</div>
  </div>
);

const Profile = () => {
  const [agent, setAgent] = useState('Энгийн');
  const router = useRouter();
  return (
    <div className="flex-col h-full">
      <div
        className={mergeNames(
          'grid grid-cols-1 xs:grid-cols-2',
          'gap-y-10 gap-x-10',
          'py-5'
        )}
      >
        <GroupLayout title="Овог Нэр">
          <ProfileInput ph="Ганхуяг Баяр...." item="username" />
        </GroupLayout>

        <GroupLayout title="Утас">
          <ProfileInput
            disabled
            type="number"
            ph="0000-0000"
            item="phone"
            // className="cursor-not-allowed invalid:border"
          />
        </GroupLayout>

        <GroupLayout
          title="Хэрэглэгчийн төрөл"
          className="col-span-1 md:col-span-2 lg:col-span-1"
        >
          <div className="flex flex-row justify-center gap-4">
            {['Энгийн', 'Агент', 'Байгууллага'].map((text, id) => {
              const isSelected = text === agent;
              return (
                <ButtonSelectItem
                  text={text}
                  key={id}
                  isSelected={isSelected}
                  onClick={() => setAgent(text)}
                />
              );
            })}
          </div>
        </GroupLayout>

        <GroupLayout title="Төрсөн өдөр">
          <ProfileInput ph="asd/asd/asd" type="date" item="date" />
        </GroupLayout>

        {/* //TODO: Burgteltei email ni haragdaj bdgaar ghde disabled eniig yahav hereggui gevel arilgachna */}

        <GroupLayout title="Бүртгэлтэй Имэйл">
          <ProfileInput
            type="email"
            ph="you@example.com"
            item="email"
            className="disabled:"
            disabled
          />
        </GroupLayout>
      </div>
      <button
        className={mergeNames(
          'hidden',
          'float-right px-5 py-2 font-bold text-white bg-mainBlue rounded-[30px]'
        )}
      >
        Хадгалах
      </button>
    </div>
  );
};

export default Profile;
