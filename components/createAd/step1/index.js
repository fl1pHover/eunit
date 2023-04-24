import FormLabel from '@/components/createAd/formLabel';
import Title from '@/components/createAd/title';

import FieldAdType from './fieldAdType';
import FieldCategory from './fieldCategory';
import FieldSellType from './fieldSellType';
import FieldSubCategory from './fieldSubCategory';

const Step1 = ({
  types = {},
  setTypes = () => {},
  sharing = false,
  setSelectedParent,
  categories = [],
  title = 'Таны зарах хөрөнгийн төрөл?',
  selltypeTitle,
}) => {
  return (
    <>
      <Title>Төрөл</Title>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
        <>
          {/* CATEGORY */}
          <FormLabel num="1" title={title} />
          <FieldCategory {...{ types, categories, setTypes }} />
        </>

        {types?.categoryName && (
          // SUBCATEGORY
          <>
            <FormLabel title="Дэд төрөл" />
            <FieldSubCategory
              {...{ types, setTypes }}
              setSelectedParent={setSelectedParent}
              localCategory={
                categories.filter((c) => c.href == types.categoryName)[0]
                  .subCategory
              }
            />
          </>
        )}

        {types.subCategoryId && (
          // ZARAH TURUL BOLON ZARIIN TURUL
          // ZARAH TURUL: SELL OR RENT
          // ZARIIN TURUL: DEFAULT, SPECIAL, POSTER
          <>
            <FieldSellType
              title={selltypeTitle}
              {...{ types, setTypes }}
              sharing={sharing}
            />
            <FieldAdType {...{ types, setTypes }} sharing={sharing} />
          </>
        )}
      </div>
    </>
  );
};

export default Step1;
