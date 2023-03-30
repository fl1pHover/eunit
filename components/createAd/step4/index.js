import { Committee } from '@/constants/enums';
import Input from '@/lib/Input';
import Select from '@/lib/Select';
import mergeNames from '@/util/mergeNames';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import FilterDate, {
  FilterButtonSelector,
  FilterCounter,
  FilterSelect,
  FilterText,
  FilterYear,
} from '../filters';
import ButtonSelectItem from '../formButtonSelectItem';
import FormLabel from '../formLabel';

const Step3 = ({ filter, selectedParent, setSelectedParent }) => {
  const [usedYear, setUsedYear] = useState(false);
  const [selected, setSelected] = useState({
    bathroom: '',
    masterRoom: '',
  });

  // const [filters, setFilters] = useState(filter)

  return (
    <div className="grid w-full md:grid-cols-2 ">
      {filter?.values?.map((f, i) => {
        if (
          f.other == true &&
          f.value.find((v) => v.id == 'other') == undefined
        )
          f.value.push({ id: 'other', value: 'Бусад' });
        if (f.types == 'date')
          return (
            <FilterDate
              key={i}
              title={f.name}
              defValue={usedYear}
              name={f.name}
              onSelect={(num) => {
                f.input = `${num}`;
                let isNull = selectedParent.findIndex(
                  (s) => s.parent == f.type
                );

                if (isNull > -1) {
                  let selectedArr = [...selectedParent];

                  selectedArr[isNull] = {
                    id: i,
                    parent: f.type,
                    index: i,
                    input: num,
                    name: f.name,
                  };
                  setSelectedParent(selectedArr);
                } else {
                  setSelectedParent([
                    ...selectedParent,
                    {
                      id: i,
                      parent: f.type,
                      index: i,
                      input: num,
                      name: f.name,
                    },
                  ]);
                }
              }}
            />
          );
        if (f.types == 'year')
          return (
            <FilterYear
              key={i}
              title={f.name}
              onChange={(e) => {
                f.input = `${e}`;
                let isNull = selectedParent.findIndex(
                  (s) => s.parent == f.type
                );

                if (isNull > -1) {
                  let selectedArr = [...selectedParent];

                  selectedArr[isNull] = {
                    id: e,
                    parent: f.type,
                    index: i,
                    input: e,
                    name: f.name,
                  };
                  setSelectedParent(selectedArr);
                } else {
                  setSelectedParent([
                    ...selectedParent,
                    {
                      id: e,
                      parent: f.type,
                      index: i,
                      input: e,
                      name: f.name,
                    },
                  ]);
                }
              }}
            />
          );
        if (f.type === 'room')
          return (
            <FilterCounter
              key={i}
              title={'Өрөөний тоо'}
              limit={f.value[f.value.length - 2].value}
              maxValue={f.value[f.value.length - 1].value}
              setValue={(val) => {
                f.input = val;
                let isNull = selectedParent.findIndex(
                  (s) => s.parent == f.type
                );

                if (isNull > -1) {
                  let selectedArr = [...selectedParent];

                  selectedArr[isNull] = {
                    id: val,
                    parent: f.type,
                    index: i,
                    input: val,
                    name: f.name,
                  };
                  setSelectedParent(selectedArr);
                } else {
                  setSelectedParent([
                    ...selectedParent,
                    {
                      id: val,
                      parent: f.type,
                      index: i,
                      input: val,
                      name: f.name,
                    },
                  ]);
                }
              }}
            />
          );
        if (f.types == 'text')
          return (
            <FilterText
              key={i}
              title={f.name}
              ph={f.name}
              value={
                selectedParent?.filter((s) => s.parent == f.type)[0]?.input ??
                ''
              }
              onChange={(e) => {
                f.input = e.target.value;
                let isNull = selectedParent.findIndex(
                  (s) => s.parent == f.type
                );

                if (isNull > -1) {
                  let selectedArr = [...selectedParent];

                  selectedArr[isNull] = {
                    id: e.target.value,
                    parent: f.type,
                    index: i,
                    input: e.target.value,
                    name: f.name,
                  };
                  setSelectedParent(selectedArr);
                } else {
                  setSelectedParent([
                    ...selectedParent,
                    {
                      id: e.target.value,
                      parent: f.type,
                      index: i,
                      input: e.target.value,
                      name: f.name,
                    },
                  ]);
                }
              }}
            />
          );
        if (f.type === 'bathroom')
          return (
            <FilterButtonSelector
              key={i}
              title={'Угаалгын өрөөний тоо'}
              data={f?.value}
              selected={selected.bathroom}
              Item={({ text, onClick, id, isSelected, ...props }) => {
                return (
                  <ButtonSelectItem
                    text={text}
                    key={id}
                    isSelected={isSelected}
                    {...props}
                    onClick={() => {
                      f.input = text;
                      let isNull = selectedParent.findIndex(
                        (s) => s.parent == f.type
                      );

                      if (isNull > -1) {
                        let selectedArr = [...selectedParent];

                        selectedArr[isNull] = {
                          id,
                          parent: f.type,
                          index: i,
                          input: text,
                          name: f.name,
                        };
                        setSelectedParent(selectedArr);
                      } else {
                        setSelectedParent([
                          ...selectedParent,
                          {
                            id: id,
                            parent: f.type,
                            index: i,
                            input: text,
                            name: f.name,
                          },
                        ]);
                      }
                      setSelected((prev) => ({
                        ...prev,
                        bathroom: text,
                      }));
                      onClick();
                    }}
                  >
                    {text}
                    {props.children}
                  </ButtonSelectItem>
                );
              }}
            />
          );
        if (f.type === 'masterBedroom')
          return (
            <FilterButtonSelector
              key={i}
              title={'Мастер унтлагын өрөөний тоо'}
              data={f?.value}
              selected={selected.masterRoom}
              Item={({ text, onClick, id, isSelected, ...props }) => {
                return (
                  <ButtonSelectItem
                    text={text}
                    key={id}
                    isSelected={isSelected}
                    {...props}
                    onClick={() => {
                      f.input = text;
                      let isNull = selectedParent.findIndex(
                        (s) => s.parent == f.type
                      );

                      if (isNull > -1) {
                        let selectedArr = [...selectedParent];

                        selectedArr[isNull] = {
                          id,
                          parent: f.type,
                          index: i,
                          input: text,
                          name: f.name,
                        };
                        setSelectedParent(selectedArr);
                      } else {
                        setSelectedParent([
                          ...selectedParent,
                          {
                            id: id,
                            parent: f.type,
                            index: i,
                            input: text,
                            name: f.name,
                          },
                        ]);
                      }
                      setSelected((prev) => ({
                        ...prev,
                        masterRoom: text,
                      }));
                      onClick();
                    }}
                  >
                    {text}
                    {props.children}
                  </ButtonSelectItem>
                );
              }}
            />
          );
        if (f.type == 'committee') {
          return (
            <FilterSelect
              key={i}
              label={f.input != '' ? f.input : f.name}
              title={f.name}
              data={
                selectedParent.find(
                  (s) => s.parent == f.parentId && s.id == 'country'
                ) == undefined
                  ? Committee
                  : f.value.find((s) =>
                      selectedParent.findIndex(
                        (se) => se.parent == s.parent && s.parentId == se.id
                      ) > -1
                        ? 0
                        : undefined
                    ) !== undefined
                  ? Committee
                  : f.value.filter((v) => {
                      let index = selectedParent.findIndex(
                        (s) => s.id == v.parentId
                      );

                      if (index > -1)
                        return v.parentId == selectedParent[index]?.id;
                    })
              }
              Item={({ data, onClick, id, ...props }) => {
                return (
                  <button
                    {...props}
                    onClick={() => {
                      f.input = data;
                      let isNull = selectedParent.findIndex(
                        (s) => s.parent == f.type
                      );

                      if (isNull > -1) {
                        let selectedArr = [...selectedParent];

                        selectedArr[isNull] = {
                          id,
                          parent: f.type,
                          name: f.name,
                          input: data,
                          index: i,
                        };
                        setSelectedParent(selectedArr);
                      } else {
                        setSelectedParent([
                          ...selectedParent,
                          {
                            id: id,
                            parent: f.type,
                            index: i,
                            input: data,
                            name: f.name,
                          },
                        ]);
                      }
                      onClick();
                    }}
                  >
                    {data}
                    {props.children}
                  </button>
                );
              }}
            />
          );
        }
        if (f.types == 'dropdown')
          return f.parentId == null ? (
            <FilterSelect
              key={i}
              title={f.name}
              data={f.value}
              label={f.input != '' ? f.input : f.name}
              Item={({ data, onClick, id, ...props }) => {
                return (
                  <button
                    {...props}
                    onClick={() => {
                      f.input = data;
                      let isNull = selectedParent.findIndex(
                        (s) => s.parent == f.type
                      );

                      if (isNull > -1) {
                        let selectedArr = [...selectedParent];

                        selectedArr[isNull] = {
                          id,
                          parent: f.type,
                          index: i,
                          input: data,
                          name: f.name,
                        };
                        setSelectedParent(selectedArr);
                      } else {
                        setSelectedParent([
                          ...selectedParent,
                          {
                            id: id,
                            parent: f.type,
                            index: i,
                            input: data,
                            name: f.name,
                          },
                        ]);
                      }

                      onClick();
                    }}
                  >
                    {data}
                    {props.children}
                  </button>
                );
              }}
            />
          ) : selectedParent.find((d) => d.parent == f.parentId) != undefined &&
            f.value.length > 0 ? (
            <ItemContainer
              key={i}
              className={'flex flex-col items-center justify-center'}
            >
              <FormLabel title={f.name} />

              <Select
                width="long"
                data={f.value.filter((fv) => {
                  let parent = selectedParent.find(
                    (s) =>
                      (s.id == fv.parentId && fv.parent == s.parent) ||
                      fv.id == 'other'
                  );
                  if (parent != undefined) return fv;
                })}
                label={f.input != '' ? f.input : f.name}
                Item={({ data, onClick, id, ...props }) => {
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        if (data != 'Бусад') f.input = data;
                        let isNull = selectedParent.findIndex(
                          (s) => s.parent == f.type
                        );

                        if (isNull > -1) {
                          let selectedArr = [...selectedParent];

                          selectedArr[isNull] = {
                            id,
                            parent: f.type,
                            index: i,
                            input: data,
                            name: f.name,
                          };
                          setSelectedParent(selectedArr);
                        } else {
                          setSelectedParent([
                            ...selectedParent,
                            {
                              id: id,
                              parent: f.type,
                              index: i,
                              input: data,
                              name: f.name,
                            },
                          ]);
                        }

                        onClick();
                      }}
                    >
                      {data}
                      {props.children}
                    </button>
                  );
                }}
              />
              {selectedParent.find(
                (d) => d.id == 'other' && d.parent == f.type
              ) != undefined && (
                <>
                  <Box h={4} />
                  <Input
                    onChange={(e) => {
                      f.input = e.target.value;
                      let isNull = selectedParent.findIndex(
                        (s) => s.parent == f.type
                      );

                      if (isNull > -1) {
                        let selectedArr = [...selectedParent];

                        selectedArr[isNull] = {
                          id: 'other',
                          parent: f.type,
                          index: 0,
                          input: e.target.value,
                          name: f.name,
                        };
                        setSelectedParent(selectedArr);
                      } else {
                        setSelectedParent([
                          ...selectedParent,
                          {
                            id: 'other',
                            parent: f.type,
                            index: 0,
                            input: e.target.value,
                            name: f.name,
                          },
                        ]);
                      }
                    }}
                  />
                </>
              )}
            </ItemContainer>
          ) : (
            <ItemContainer key={i}>
              <FormLabel title={f.name} />
              <Select
                width="long"
                data={
                  f.other == true
                    ? filter?.values
                        ?.filter((fv, ind) => {
                          let index = selectedParent.find(
                            (sf) => sf.parent == f.parentId
                          );
                          if (index != undefined) {
                            if (ind == index.index) {
                              let value = fv.input;
                              return fv;
                            }
                          }
                        })[0]
                        ?.value.push({ id: 'other', value: 'Бусад' })
                    : filter?.values
                        ?.map((fv, ind) => {
                          let index = selectedParent.find(
                            (sf) => sf.parent == f.parentId
                          );
                          if (index != undefined) {
                            if (ind == index.index) {
                              let valueC = { ...fv };
                              let indexIndex = valueC.value.findIndex(
                                (fvf) => fvf.value == index.input
                              );
                              valueC.value = valueC.value.slice(
                                0,
                                indexIndex + 1
                              );

                              return valueC;
                            }
                          }
                        })
                        .filter((a) => a != undefined)[0]?.value
                }
                label={f.input != '' ? f.input : f.name}
                Item={({ data, onClick, id, ...props }) => {
                  return (
                    <button
                      {...props}
                      onClick={() => {
                        f.input = data;
                        let isNull = selectedParent.findIndex(
                          (s) => s.parent == f.type
                        );

                        if (isNull > -1) {
                          let selectedArr = [...selectedParent];

                          selectedArr[isNull] = {
                            id,
                            parent: f.type,
                            index: i,
                            input: data,
                            name: f.name,
                          };
                          setSelectedParent(selectedArr);
                        } else {
                          setSelectedParent([
                            ...selectedParent,
                            {
                              id: id,
                              parent: f.type,
                              index: i,
                              input: data,
                              name: f.name,
                            },
                          ]);
                        }

                        onClick();
                      }}
                    >
                      {data}
                      {props.children}
                    </button>
                  );
                }}
              />
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

export const ItemContainer = ({ children, className }) => (
  <div className={mergeNames('mb-10', className)}>{children}</div>
);

export default Step3;
