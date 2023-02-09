import Select from '@/lib/Select';
import FormLabel from '../formLabel';

import { InputContainer } from './inputContainer';

export const FieldCommittee = ({
  locationData,
  selectedLocalData,
  setPositions = () => {},
  handleNamedata = () => {},
}) => {
  return (
    <InputContainer>
      <FormLabel title="Хороо" />
      <Select
        data={[
          1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        ]}
        label={'Хороо'}
        Item={({ data, onClick, ...props }) => {
          return (
            <button
              {...props}
              onClick={() => {
                onClick();
                setPositions((prev) => ({
                  ...prev,

                  committee_id: `${props.id + 1}-р хороо`,
                }));
                console.log(props);
                handleNamedata('committee', `${data}-р хороо`);
              }}
            >
              <p>{data}-р хороо</p>
            </button>
          );
        }}
      />
    </InputContainer>
  );
  // return district === 'Орон нутаг' ? (
  //   <InputContainer>
  //     <FormLabel title="Сум" />
  //     <Input
  //       ph="Сум"
  //       value={committee ?? ''}
  //       onChange={(val) => onClick(val)}
  //     />
  //   </InputContainer>
  // ) : (
  //   <InputContainer>
  //     <FormLabel title="Хороо" />
  //     <NumberInput
  //       ph="Хороо"
  //       value={committee ?? ''}
  //       onChange={(val) => onClick(val)}
  //     />
  //     <p className="">Заавал тоо оруулна уу</p>
  //   </InputContainer>
  // );
};
