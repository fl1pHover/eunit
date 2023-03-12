import Counter from '@/lib/Counter';
import { DateYearSelector } from '@/lib/DateSelector';
import Input from '@/lib/Input';
import Select from '@/lib/Select';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/react';
import FormLabel from './formLabel';
import { ItemContainer } from './step4';

const FilterDate = ({ defValue, title, name, onSelect = () => {} }) => {
  return (
    <ItemContainer>
      <FormLabel title={title} />
      <DateYearSelector
        defValue={defValue}
        placeholder={name}
        onSelect={onSelect}
      />
    </ItemContainer>
  );
};
export default FilterDate;

export const FilterYear = ({ title, onChange = () => {} }) => {
  return (
    <ItemContainer>
      <FormLabel title={title + ' / жил'} />
      <NumberInput
        size="md"
        allowMouseWheel
        min={0}
        className="flex flex-row justify-between mx-auto overflow-hidden border-2 border-blue-500 rounded-full md:w-2/3"
        onChange={onChange}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </ItemContainer>
  );
};

export const FilterCounter = ({
  limit,
  maxValue,
  setValue = () => {},
  title,
}) => {
  return (
    <ItemContainer className={'flex flex-col items-center justify-center'}>
      <FormLabel title={title} />
      <Counter
        limit={parseInt(limit)}
        maxValue={maxValue}
        setValue={setValue}
      />
    </ItemContainer>
  );
};

export const FilterText = ({ title, ph, onChange = () => {} }) => {
  return (
    <ItemContainer className={'flex flex-col items-center justify-center'}>
      <FormLabel title={title} />
      <Input ph={ph} onChange={onChange} />
    </ItemContainer>
  );
};

export const FilterButtonSelector = ({
  title,
  data,
  Item = () => <></>,
  selected,
}) => {
  return (
    <ItemContainer>
      <FormLabel title={title} />
      <div className="flex flex-row justify-center gap-4">
        {data?.map((text, id) => {
          return (
            <Item
              key={id}
              text={text.value}
              isSelected={text.value == selected}
              onClick={() => {}}
            />
          );
        })}
      </div>
    </ItemContainer>
  );
};

export const FilterSelect = ({ title, data, label, Item = () => <></> }) => {
  return (
    <ItemContainer>
      <FormLabel title={title} />

      <Select width="long" data={data} label={label} Item={Item} />
    </ItemContainer>
  );
};
