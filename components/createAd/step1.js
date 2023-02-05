import React from 'react';
import { BiCheck } from 'react-icons/bi';

import { categories as localCategory } from '@/data/categories';
import mergeNames from '@/util/mergeNames';

import CategoryButtonSelect from '@/components/createAd/categoryButtonSelect';
import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import FormLabel from '@/components/createAd/formLabel';
import Line from '@/components/createAd/formLine';

const Step1 = ({
  categories = localCategory,
  AdTypes = {},
  selectedIndex = {},
  assignCategoryIdx = () => {},
  assignSubCategoryIdx = () => {},
}) => {
  const [selectedAdType, setSelectedAdType] = React.useState(AdTypes.sell.id); // yr ni bol zarah gsn utga "sell"

  return (
    <div className="w-full">
      <FormLabel num="1" title="Таны зарах хөрөнгийн төрөл?" />
      <div className="flex justify-center">
        <div className="grid w-full grid-cols-3 gap-4 py-4 lg:grid-cols-6 lg:gap-4 auto-rows-fr md:w-4/5">
          {categories?.map((item, key) => {
            const isSelected =
              key.toString() === selectedIndex.category.toString();

            return (
              <CategoryButtonSelect
                key={key}
                item={item}
                isSelected={isSelected}
                onClick={() => assignCategoryIdx(key)}
              />
            );
          })}
        </div>
      </div>

      {(selectedIndex?.category || selectedIndex?.category === 0) && (
        <div>
          <Line />
          <FormLabel title="Дэд төрөл" />
          <div className="flex flex-wrap justify-center gap-1 mb-6 md:gap-4 md:px-10">
            {localCategory?.[selectedIndex.category]?.submenu?.map(
              (item, key) => {
                const isSelected = selectedIndex.subCategory === item.href;
                return (
                  <ButtonSelectItem
                    edit={false}
                    key={key}
                    isSelected={isSelected}
                    text={item?.name ?? item?.category}
                    onClick={() => assignSubCategoryIdx(item.href)}
                  />
                );
              }
            )}
          </div>
        </div>
      )}
      {selectedIndex.subCategory && (
        <div>
          <Line />
          <FormLabel num={2} title="Борлуулах төрөл" />
          <div className="flex flex-row justify-center gap-4 mt-2">
            {Object.keys(AdTypes).map((type, key) => {
              //  type.id === AdTypes[type].id ene 2 ijilhen utgatai
              // console.log("type", type, AdTypes[type].id, selectedAdType);
              const isSelected = type === selectedAdType;

              return (
                <ButtonSelectItem
                  key={key}
                  isSelected={isSelected}
                  text={AdTypes[type].name}
                  onClick={() => setSelectedAdType(type)}
                  LeftItem={() => (
                    <div
                      className={mergeNames(
                        'rounded-full w-[40px] h-[40px] flex justify-center items-center',
                        isSelected ? 'bg-white' : ''
                      )}
                    >
                      <BiCheck
                        size={30}
                        className={mergeNames(
                          isSelected ? 'text-blue-500' : 'text-blue-200'
                        )}
                      />
                    </div>
                  )}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
