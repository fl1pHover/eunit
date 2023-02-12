import Select from '@/lib/Select';
import FormLabel from '../formLabel';

const FieldTown = ({
  selectedLocalData,
  handleNamedata = () => {},
  setPositions = () => {},
  town,
}) => {
  return (
    <InputContainer>
      <FormLabel title={town.name} />
      <Select
        width="long"
        data={town?.values}
        label={town.name}
        Item={({ data, onClick, ...props }) => {
          return (
            <button
              {...props}
              onClick={() => {
                onClick();
                setPositions((prev) => ({
                  ...prev,

                  town_id: data,
                }));
                handleNamedata('town', data);
              }}
            >
              <p>{data}</p>
            </button>
          );
        }}
      />
    </InputContainer>
  );
};

export default FieldTown;

const InputContainer = (props) => (
  <div className="flex flex-col items-center w-full md:w-1/2">
    {props.children}
  </div>
);
