import Input from '@/lib/Input';
// import Select from '@/lib/Select';
import { Box, Select } from '@chakra-ui/react';
import React, { useState } from 'react';
import ButtonSelectItem from './formButtonSelectItem';
import FormLabel from './formLabel';
import FormLine from './formLine';

const Step2 = ({
  subCategory = {},
  districts = [],
  locations = [],
  positions = {},
  town = {},
  positionNames = {},
  setPositionNames = () => {},
  setDistrictId = () => {},
  setLocationId = () => {},
  setCommitteeId = () => {},
  setTownId = () => {},
}) => {
  const [selectedLocalData, setSelectedLocalData] = useState({
    district: positionNames?.district ?? false,
    location: positionNames?.location ?? false,
    committee: positionNames?.committee ?? false,
    town: positionNames?.town ?? false,
  }); // saving local names
  // console.log("positionNames", positionNames, selectedLocalData);
  const [type, setType] = useState({
    location: true,
    town: true,
    committee: true,
  });
  const locationData = React.useMemo(
    () => {
      return (
        locations?.filter((item) => {
          return positions?.district_id == item.district_id;
        }) || []
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [positions?.district_id]
  );

  const handleNamedata = (name, value) => {
    setPositionNames((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedLocalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <FormLabel title="Дүүрэг / Орон нутаг" num={3} />
      {/* DISTRICT CUSTOM SELECTION */}
      <div className="flex flex-wrap justify-center gap-2 md:space-x-4 md:gap-0">
        {districts?.map((item, key) => {
          return (
            <ButtonSelectItem
              key={key}
              text={item?.name}
              isSelected={selectedLocalData?.district === item?.name}
              onClick={() => {
                setDistrictId(item?._id);
                setLocationId('');
                setPositionNames((prev) => ({
                  ...prev,
                  district: item?.name,
                  location: '',
                }));
                setSelectedLocalData((prev) => ({
                  ...prev,
                  location: false,
                  district: item?.name,
                }));
              }}
            />
          );
        })}
      </div>

      <FormLine />
      {selectedLocalData.district && (
        <div className="mt-4 mb-10">
          <FormLabel title="Байршил" num={4} />
          <div>
            <Select
              className="w-full mx-auto rounded-full md:w-2/3"
              onChange={(e) => {
                locationData[e.target.value].name != 'Бусад'
                  ? setLocationId(locationData[e.target.value].name)
                  : setType((prev) => ({ ...prev, location: false }));
              }}
              placeholder="Байршил"
            >
              {locationData.map((l, i) => {
                return (
                  <option key={i} value={i}>
                    {l.name}
                  </option>
                );
              })}
            </Select>
            {type.location == false && (
              <>
                <Box h={4} />
                <Input
                  placeholder="Байршил"
                  onChange={(e) => setLocationId(e.target.value)}
                />
              </>
            )}
          </div>
        </div>
      )}

      <FormLine />
      {positions.location_id && (
        <div className="flex flex-col gap-8 md:flex-row md:gap-4">
          <InputContainer>
            <FormLabel title="Хороо / Сум" />
            {
              <>
                <Select></Select>
                {!type.committee && (
                  <Input
                    placeholder="Хороо / Сум"
                    onChange={(val) => {
                      setCommitteeId(val.target.value);
                    }}
                  />
                )}
              </>
            }
          </InputContainer>
          {town && (
            <InputContainer>
              <FormLabel title="Хотхон" />
              {
                <>
                  <Select
                    className="rounded-md"
                    placeholder="Хотхон"
                    onChange={(e) =>
                      e.target.value == 'Бусад'
                        ? setType((prev) => ({ ...prev, town: false }))
                        : setTownId(e.target.value)
                    }
                  >
                    {town[0]?.values.map((t, i) => {
                      return (
                        <option key={i} value={t}>
                          {t}
                        </option>
                      );
                    })}
                  </Select>
                  {!type.town && (
                    <>
                      <Box h={4} />
                      <Input
                        placeholder="Хотхон"
                        onChange={(val) => {
                          setTownId(val.target.value);
                        }}
                      />
                    </>
                  )}
                </>
              }
            </InputContainer>
          )}
          {/* <InputContainer>
            <FormLabel title="Хотхон" />
            <Input
              ph="Хотхон"
              value={selectedLocalData?.town}
              onChange={(val) => {
                setCommitteeId(val);
                handleNamedata('town', val);
              }}
            />
          </InputContainer> */}
        </div>
      )}
    </div>
  );
};

const InputContainer = (props) => (
  <div className="flex flex-col items-center w-full md:w-1/2">
    {props.children}
  </div>
);

// const Height = () => <div className="w-full h-10" />;

export default Step2;