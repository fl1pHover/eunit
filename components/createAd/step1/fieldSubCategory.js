import ButtonSelectItem from '@/components/createAd/formButtonSelectItem';
import Line from '@/components/createAd/formLine';

const FieldSubCategory = ({
  types = {},
  localCategory,
  setTypes = () => {},
}) => {
  return (
    <>
      <div className="flex flex-wrap md:gap-4 gap-1 md:px-10 justify-center mb-6">
        {localCategory?.map((item, key) => {
          const isSelected = types.subCategoryId === item.href;
          return (
            <ButtonSelectItem
              key={key}
              isSelected={isSelected}
              text={item?.name ?? item?.category}
              onClick={() =>
                setTypes((prev) => ({
                  ...prev,
                  subCategoryId: item.href,
                }))
              }
            />
          );
        })}
      </div>
      <Line />
    </>
  );
};

export default FieldSubCategory;
