import Counter from '@/lib/Counter';
import { DateYearSelector } from '@/lib/DateSelector';
import Select from '@/lib/Select';
import mergeNames from '@/util/mergeNames';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import ButtonSelectItem from '../formButtonSelectItem';
import FormLabel from '../formLabel';

const Step3 = ({ filter }) => {
  const [usedYear, setUsedYear] = useState(false);
  const [selected, setSelected] = useState({
    bathroom: '',
    masterRoom: '',
  });
  const [selectedParent, setSelectedParent] = useState([])
  // const [filters, setFilters] = useState(filter)

  return (
    <div className="grid w-full md:grid-cols-2 ">
      {filter?.values?.map((f, i) => {

        if (f.types == 'date')
          return (
            <ItemContainer>
              <FormLabel title={f.name} />
              <DateYearSelector
                defValue={usedYear}
                placeholder={f.name}
                onSelect={(num) => (f.input = num)}
              />
            </ItemContainer>
          );
        if (f.types == 'year')
          return (
            <ItemContainer>
              <FormLabel title={f.name + ' / жил'} />
              <NumberInput
                size="md"
                allowMouseWheel
                min={0}
                className="flex flex-row justify-between mx-auto overflow-hidden border-2 border-blue-500 rounded-full md:w-2/3"
                onChange={(e) => (f.input = e)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </ItemContainer>
          );
        if (f.type === 'room')
          return (
            <ItemContainer
              className={'flex flex-col items-center justify-center'}
            >
              <FormLabel title="Өрөөний тоо" />
              <Counter
                limit={parseInt(f.value[f.value.length - 2].value)}
                maxValue={f.value[f.value.length - 1].value}
                setValue={(val) => (f.input = val)}
              />
            </ItemContainer>
          );

        if (f.type === 'bathroom')
          return (
            <ItemContainer>
              <FormLabel title="Угаалгын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {f?.value?.map((text, id) => {
                  return (
                    <ButtonSelectItem
                      key={id}
                      text={text.value}
                      isSelected={text.value == selected.bathroom}
                      onClick={() => {
                        f.input = text.value;
                        setSelected((prev) => ({
                          ...prev,
                          bathroom: text.value,
                        }));
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
        if (f.type === 'masterBedroom')
          return (
            <ItemContainer>
              <FormLabel title="Мастер унтлагын өрөөний тоо" />
              <div className="flex flex-row justify-center gap-4">
                {f?.value?.map((text, id) => {
                  return (
                    <ButtonSelectItem
                      text={text.value}
                      key={id}
                      isSelected={text.value == selected.masterRoom}
                      onClick={() => {
                        f.input = text.value;
                        setSelected((prev) => ({
                          ...prev,
                          masterRoom: text.value,
                        }));
                      }}
                    />
                  );
                })}
              </div>
            </ItemContainer>
          );
        if (f.types == 'dropdown')
       return  f.parentId == null  ? 
           
            <ItemContainer
            //  className="bg-red-100"
            >
              <FormLabel title={f.name} />
              
                <Select
                  width="long"
                  data={f.value}
                  label={f.input != '' ? f.input : f.name}
                  Item={({ data, onClick, id, ...props }) => {
                    return (
                      <button
                        {...props}
                        onClick={() => {
                          f.input = data;
                          let isNull =  selectedParent.findIndex((s) => s.parent == f.type)
                          
                          if(isNull > -1) {
                            let selectedArr = [...selectedParent]
                            
                            selectedArr[isNull] = {
                              id,
                              parent: f.type,
                              index: i
                            }
                            setSelectedParent(selectedArr)

                          } else {
                            
                          setSelectedParent([...selectedParent, {
                            id: id,
                            parent: f.type,
                            index: i
                          }])
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
           : (selectedParent.find((d) => d.parent == f.parentId) != undefined && f.value.length> 0) ? <ItemContainer>
           <FormLabel title={f.name}/>
           
               <Select
                 width="long"
                 data={f.value.filter((fv) => {
                   let parent = selectedParent.find((s) => s.id == fv.parentId && s.parent == s.parent)
                   if(parent != undefined) return fv
                 })}
                 label={f.input != '' ? f.input : f.name}
                 Item={({ data, onClick, id, ...props }) => {
                   return (
                     <button
                       {...props}
                       onClick={() => {
                         f.input = data;
                         let isNull =  selectedParent.find((s) => s == id)
                         if(isNull == undefined) {
                           setSelectedParent([...selectedParent,  {
                            id: id,
                            parent: f.type,
                            index: i
                          }])
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
             
         </ItemContainer> : <ItemContainer>
         <FormLabel title={f.name}/>
         <Select
                 width="long"
                 data={filter?.values?.filter((fv, ind) => {
                  let index = selectedParent.find((sf) => sf.parent == f.parentId)
                  if(index != undefined){
                  
                  
                  if(ind == index.index) {
                    let value = fv.input
                    console.log(value)
                    return fv
                  }
                  
                  }
                 })[0]?.value}
                 label={f.input != '' ? f.input : f.name}
                 Item={({ data, onClick, id, ...props }) => {
                   return (
                     <button
                       {...props}
                       onClick={() => {
                         f.input = data;
                         let isNull =  selectedParent.find((s) => s == id)
                         if(isNull == undefined) {
                           setSelectedParent((prev) => [...prev, id])
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
