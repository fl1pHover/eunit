import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import CheckItem from './checkItem';

import { AdTypes, SharingView } from '@/constants/enums';

const FieldAdType = ({ types = {}, setTypes = () => {}, sharing }) => {
  return (
    <>
      <FormLabel title="Зарын төрөл" />
      <div className="flex flex-row flex-wrap justify-center gap-4 mt-2">
        {Object.keys(sharing ? SharingView : AdTypes).map((type, key) => {
          const isSelected = type === types?.adType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={sharing ? SharingView[type].name : AdTypes[type].name}
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
