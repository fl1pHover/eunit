import Input from "@/lib/Input";
import { useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { LilFormLabel } from "./formLabel";
import FormLine from "./formLine";

const Step4 = ({ filter }) => {
  const [payment, setPayment] = useState(false);
  return (
    <div>
      <div className="grid grid-cols-1 px-10 mt-4 md:grid-cols-3 md:px-0">
        {filter?.map((f, i) => {
          return (
            <div className="flex flex-col items-center" key={i}>
              <LilFormLabel title={f.name} />
              <Input
                onChange={(e) => {
                  f.value = e;
                }}
              />
            </div>
          );
        })}
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
          <Input />
        </div>
        <div>
          <LilFormLabel title="Дэлгэрэнгүй" />
          <textarea className="border-2 border-blue-500 rounded-xl outline-none p-4 min-h-[30vh] min-w-[40vw]" />
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
