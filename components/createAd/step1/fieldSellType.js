import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import Line from '@/components/createAd/formLine';
import CheckItem from './checkItem';

import {  SharingSellTypes } from '@/constants/enums';

const FieldSellType = ({ types = {}, setTypes = () => {} }) => {
  return (
    <>
      <FormLabel num={2} title="Борлуулах төрөл" />
      <div className="flex flex-row justify-center gap-4 mt-2">
        {Object.keys(SharingSellTypes).map((type, key) => {
          const isSelected = SharingSellTypes[type].name === types?.sellType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={SharingSellTypes[type].name}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  sellType: SharingSellTypes[type].name,
                }))
              }
              LeftItem={() => <CheckItem {...{ isSelected }} />}
            />
          );
        })}
      </div>
      <Line />
    </>
  );
};

export default FieldSellType;
