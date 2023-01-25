import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import ProfileInput from '@/components/Profile/profileInput';
import Input from '@/lib/Input';
import mergeNames from '@/util/mergeNames';
import { useState } from 'react';

const GroupLayout = ({ title, children, icon, className = '' }) => (
  <div className={mergeNames('flex flex-col justify-center gap-3', className)}>
    <h2 className="text-[20px] font-bold">{title}</h2>
    <div className="relative flex gap-1">
      {children}
      {icon}
    </div>
  </div>
);

const Profile = () => {
  const [agent, setAgent] = useState('Энгийн');

  return (
    <div className="flex-col justify-between h-full ">
      <div className="grid grid-cols-1 py-5 gap-x-20 gap-y-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <GroupLayout title="Овог Нэр">
            <Input ph="Lorem lorem" />
            <ProfileInput item="username" />
          </GroupLayout>
          <GroupLayout title="Утас">
            <Input type="number" ph="Lorem lorem" />
            <ProfileInput item="phone" />
          </GroupLayout>
        </div>

        <GroupLayout title="Хэрэглэгчийн төрөл">
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
          <input
            type="date"
            className={mergeNames(
              'flex items-center justify-between"',
              'w-full px-4 py-2',
              'font-medium text-black placeholder-slate-400',
              'border-2 border-blue-400 rounded-full',
              'md:w-2/3 bg-blue-100/10 outline-blue-400 '
            )}
          />
          <ProfileInput item="date" />
        </GroupLayout>
      </div>
      <button className="float-right px-5 py-2 font-bold text-white bg-mainBlue rounded-[30px]">
        Хадгалах
      </button>
    </div>
  );
};

export default Profile;
