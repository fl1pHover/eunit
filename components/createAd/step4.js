import { Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import { FiUploadCloud } from 'react-icons/fi';
import { LilFormLabel } from './formLabel';
import FormLine from './formLine';

const Step4 = ({ filter, setFilters, filters, setGeneral }) => {
  const [payment, setPayment] = useState(false);

  return (
    <div>
      <div className="grid grid-cols-1 px-10 mt-4 md:grid-cols-3 md:px-0">
        {filter?.map((f, i) => {
          return (
            f.id != 'unitPrice' && (
              <div className="flex flex-col items-center" key={i}>
                <LilFormLabel title={f.name} />
                <Input
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
        {filters.area != '' && filters.price && (
          <div className="flex flex-col items-center">
            <LilFormLabel title={'Нэгж талбайн үнэ'} />
            <Input disabled={true} value={filters.price / filters.area} />
          </div>
        )}
        <div className="flex flex-col items-center">
          <LilFormLabel title={'Зарын төрөл'} />
          <Select
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
      <div className="flex flex-col items-center gap-8 px-10 mb-10 md:px-0">
        <div className="flex flex-col items-center w-1/2">
          <LilFormLabel title="Гарчиг" />
          <Input
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, title: e.target.value }))
            }
          />
        </div>
        <div>
          <LilFormLabel title="Дэлгэрэнгүй" />
          <textarea
            className="border-2 border-blue-500 rounded-xl outline-none p-4 min-h-[30vh] min-w-[40vw]"
            onChange={(e) =>
              setGeneral((prev) => ({ ...prev, description: e.target.value }))
            }
          />
        </div>
        <div>
          <LilFormLabel title="Зураг оруулах" />
          <button className="border-2 border-dotted border-blue-400 bg-blue-100/50 rounded-xl outline-none p-4 min-h-[30vh] min-w-[40vw] flex flex-col justify-center items-center">
            <FiUploadCloud size={90} className="text-blue-400" />
            <p>Зураг оруулах</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step4;
