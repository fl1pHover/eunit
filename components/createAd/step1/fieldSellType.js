import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import Line from '@/components/createAd/formLine';
import CheckItem from './checkItem';

import { SellTypes } from '@/constants/enums';

const FieldSellType = ({ types = {}, setTypes = () => {} }) => {
  return (
    <>
      <FormLabel num={2} title="Борлуулах төрөл" />
      <div className="flex flex-row justify-center gap-4 mt-2">
        {Object.keys(SellTypes).map((type, key) => {
          const isSelected = SellTypes[type].name === types?.sellType;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={SellTypes[type].name}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  sellType: SellTypes[type].name,
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
