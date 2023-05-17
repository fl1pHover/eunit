import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import Line from '@/components/createAd/formLine';
import CheckItem from './checkItem';

import { SellTypes, SharingSellTypes } from '@/constants/enums';

const FieldSellType = ({
  types = {},
  setTypes = () => {},
  sharing = false,
  line = false,
  title = '',
}) => {
  return (
    <>
      <FormLabel num={2} title={title} />
      <div className="flex flex-row flex-wrap justify-center w-full gap-4 mt-2">
        {Object.keys(sharing ? SharingSellTypes : SellTypes).map(
          (type, key) => {
            const isSelected = sharing
              ? SharingSellTypes[type].name === types?.sellType
              : SellTypes[type].name === types?.sellType;
            return (
              <ButtonSelectItem
                key={key}
                isSelected={isSelected}
                text={
                  sharing ? SharingSellTypes[type].name : SellTypes[type].name
                }
                onClick={() =>
                  setTypes((prev) => ({
                    ...prev,
                    sellType: sharing
                      ? SharingSellTypes[type].name
                      : SellTypes[type].name,
                  }))
                }
                LeftItem={() => <CheckItem {...{ isSelected }} />}
              />
            );
          }
        )}
      </div>
      {line && <Line />}
    </>
  );
};

export default FieldSellType;
