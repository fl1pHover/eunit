import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import CheckItem from './checkItem';

import {  SharingView } from '@/constants/enums';

const FieldAdType = ({ types = {}, setTypes = () => {} }) => {
  return (
    <>
      <FormLabel title="Зарын төрөл" />
      <div className="flex flex-row justify-center gap-4 mt-2">
        {Object.keys(SharingView).map((type, key) => {
          const isSelected = type === types?.adType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={SharingView[type].name}
              onClick={() => {
                setTypes((prev) => ({
                  ...prev,
                  adType: type,
                }));
              }}
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
    </>
  );
};

export default FieldAdType;
