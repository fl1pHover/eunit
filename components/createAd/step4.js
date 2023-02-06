import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { LilFormLabel } from './formLabel';
import FormLine from './formLine';
import ImageUploader from './imageUplaoder';

const Step4 = ({ filter, setFilters, filters, setGeneral, images, setImages }) => {
  const [payment, setPayment] = useState(false);
  const [positions, setPositions] = useState({
    district_id: '',
    committee_id: '',
    location_id: '',
    town_id: '',
  });

  return (
    <div>
      <div className="grid grid-cols-1 px-5 mt-4 md:px-10 gap-x-5 md:grid-cols-3 ">
        {filter?.map((f, i) => {
          return (
            f.id != 'unitPrice' && (
              <div className="flex flex-col items-center" key={i}>
                <LilFormLabel title={f.name} />
                <Input
                  className={mergeNames(STYLES.input)}
                  onChange={(e) => {
                    switch (f.id) {
                      case 'phone':
                        setFilters((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }));
                        break;

                      case 'area':
                        setFilters((prev) => ({
                          ...prev,
                          area: e.target.value,
                        }));
                        break;

                      case 'price':
                        setFilters((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }));
                        break;
                    }
                    console.log(filters);
                  }}
                />
              </div>
            )
          );
        })}
        {/* {filters.area != '' && filters.price && ( */}
        <div className="flex flex-col items-center">
          <LilFormLabel title={'Нэгж талбайн үнэ'} />
          <Input disabled={true} value={filters?.price / filters?.area || 0} />
        </div>
        {/* )} */}
        <div className="flex flex-col items-center col-span-1 col-start-1 md:col-start-2 ">
          <LilFormLabel title={'Зарын төрөл'} />
          <Select
            className="border-2 border-blue-400 rounded-full "
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, adType: e.target.value }))
            }
            placeholder="Зарын төрөл"
          >
            <option value={'default'}>Энгийн</option>
            <option value={'special'}>Онцгой</option>
            <option value={'poster'}>Постер</option>
          </Select>
        </div>
      </div>
      {/* <FormLine /> */}
      {/* <div className="flex flex-col items-center gap-4 md:flex-row justify-evenly">
        <div>
          <LilFormLabel title="Төлбөрийн нөхцөл" />
          <div className="flex justify-center gap-4">
            {['Банкны лизингтэй', 'Хувь лизингтэй', 'Бэлэн'].map(
              (item, key) => {
                const isSelected = item === payment;
                return (
                  <ButtonSelectItem
                    key={key}
                    text={item}
                    isSelected={isSelected}
                    onClick={() => setPayment(item)}
                  />
                );
              }
            )}
          </div>
        </div>
        <div>
          <LilFormLabel title="Бартер" />
          <div className="flex justify-center gap-4">
            {['Байгаа', 'Байхгүй'].map((item, key) => {
              const isSelected = item === payment;
              return (
                <ButtonSelectItem
                  key={key}
                  text={item}
                  isSelected={isSelected}
                  onClick={() => setPayment(item)}
                />
              );
            })}
          </div>
        </div>
      </div> */}
      <FormLine />
      <div className="flex flex-col items-center gap-8 px-4 mb-10 md:px-0">
        <div className="flex flex-col items-center w-full sm:w-1/2">
          <LilFormLabel title="Гарчиг" />
          <Input
            className={mergeNames(STYLES.input)}
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <LilFormLabel title="Дэлгэрэнгүй" />
          <textarea
            className="border-2 border-blue-500 rounded-xl outline-none p-2 min-h-[30vh] min-w-[40vw]"
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div>
          <LilFormLabel title="Зураг оруулах" />
          <ImageUploader images={images} setImages={setImages}/>
        </div>
      </div>
    </div>
  );
};

export default Step4;
