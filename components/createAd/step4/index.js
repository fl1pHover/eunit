import Counter from '@/lib/Counter';
import { DateYearSelector } from '@/lib/DateSelector';
import Select from '@/lib/Select';
import mergeNames from '@/util/mergeNames';
import { useState } from 'react';
import ButtonSelectItem from '../formButtonSelectItem';
import FormLabel from '../formLabel';

const Step3 = ({ filter }) => {
  const [roomNumber, setRoomNumber] = useState(false);
  const [bedRoomNumber, setBedRoomNumber] = useState(false);
  const [bathroomNumber, setBathroomNumber] = useState(false);
  const [usedYear, setUsedYear] = useState(false);
  const [selected, setSelected] = useState({
    bathroom: '',
    masterRoom: '',
  });
  const [building, setBuilding] = useState({ allFloor: false, floor: false });
  // const [filters, setFilters] = useState(filter)

  return (
    <div className="grid w-full md:grid-cols-2 ">
      {filter?.map((f, i) => {
        // console.log(f.id)
        // console.table(f);
        if (f.type == 'date' || f.mark == 'year')
          return (
            <ItemContainer>
              <FormLabel title={f.name} />
              <DateYearSelector
                defValue={usedYear}
                placeholder={f.name}
                onSelect={(num) => (f.value = num)}
              />
            </ItemContainer>
          );
        if (f.id === 'room')
          return (
            <ItemContainer
              className={'flex flex-col items-center justify-center'}
            >
              <FormLabel title="Өрөөний тоо" />
              <Counter
                limit={parseInt(f.values[f.values.length - 2])}
                maxValue={f.values[f.values.length - 1]}
                setValue={(val) => (f.value = val)}
              />
            </ItemContainer>
          );

        if (f.id === 'bathroom')
          return (
            <ItemContainer>
              <FormLabel title="Угаалгын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {f?.values?.map((text, id) => {
                  return (
                    <ButtonSelectItem
                      key={id}
                      text={text}
                      isSelected={text == selected.bathroom}
                      onClick={() => {
                        f.value = text;
                        setSelected((prev) => ({ ...prev, bathroom: text }));
                      }}
                    />
                  );
                })}
              </div>
              {/* <Counter
            limit={3}
            maxValue="3+"
            setValue={(val) => setRoomNumber(val)}
          /> */}
            </ItemContainer>
          );
        if (f.id === 'masterBedroom')
          return (
            <ItemContainer>
              <FormLabel title="Мастер унтлагын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {f?.values?.map((text, id) => {
                  return (
                    <ButtonSelectItem
                      text={text}
                      key={id}
                      isSelected={text == selected.masterRoom}
                      onClick={() => {
                        f.value = text;
                        setSelected((prev) => ({ ...prev, masterRoom: text }));
                      }}
                    />
                  );
                })}
              </div>
            </ItemContainer>
          );
        if (f.type == 'dropdown')
          return (
            <ItemContainer
            //  className="bg-red-100"
            >
              <FormLabel title={f.name} />
              {f.parentId == null ? (
                <Select
                  width="long"
                  data={f.values}
                  label={f.value != '' ? f.value : f.name}
                  Item={({ data, onClick, id, ...props }) => {
                    return (
                      <button
                        {...props}
                        onClick={() => {
                          f.value = data;
                          onClick();
                        }}
                      >
                        {data}
                        {props.children}
                      </button>
                    );
                  }}
                />
              ) : (
                <Select
                  width="long"
                  data={filter.filter((fil) => fil.id == f.parentId)[0]?.values}
                  label={f.value != '' ? f.value : f.name}
                  Item={({ data, onClick, id, ...props }) => {
                    return (
                      <button
                        {...props}
                        onClick={() => {
                          f.value = data;
                          onClick();
                        }}
                      >
                        {data}
                        {props.children}
                      </button>
                    );
                  }}
                />
              )}
            </ItemContainer>
          );
      })}
    </div>
  );
};

const Row = (props) => {
  return (
    <div className="grid w-full grid-cols-1 gap-4 my-8 md:grid-cols-2">
      {props.children}
    </div>
  );
};

const Col = (props) => (
  <div className="flex flex-col items-center">{props.children}</div>
);

const ItemContainer = ({ children, className }) => (
  <div className={mergeNames('mb-10', className)}>{children}</div>
);

export default Step3;
