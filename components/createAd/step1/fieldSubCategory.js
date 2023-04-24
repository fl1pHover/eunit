import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import Line from '@/components/createAd/formLine';

const FieldSubCategory = ({
  types = {},
  localCategory,
  setSelectedParent,
  setTypes = () => {},
}) => {
  return (
    <>
      <div className="flex flex-wrap justify-center gap-1 mb-6 md:gap-4 md:px-10">
        {localCategory?.map((item, key) => {
          const isSelected = types.subCategoryId === item.href;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={item?.name ?? item?.category}
              onClick={() => {
                setSelectedParent([]);
                setTypes((prev) => ({
                  ...prev,
                  subCategoryId: item.href,
                }));
              }}
            />
          );
        })}
      </div>
      <Line />
    </>
  );
};

export default FieldSubCategory;
