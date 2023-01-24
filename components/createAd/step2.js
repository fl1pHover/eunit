import Input from "@/lib/Input";
import Select from "@/lib/Select";
import mergeNames from "@/util/mergeNames";
import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { CgChevronDown } from "react-icons/cg";
import ButtonSelectItem from "./formButtonSelectItem";
import FormLabel from "./formLabel";
import FormLine from "./formLine";

const Step2 = ({
  subCategory = {},
  districts = [],
  locations = [],
  positions = {},
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
      <div className="flex flex-wrap md:space-x-4 md:gap-0 gap-2 justify-center">
        {districts?.map((item, key) => {
          return (
            <ButtonSelectItem
              key={key}
              text={item?.name}
              isSelected={selectedLocalData?.district === item?.name}
              onClick={() => {
                setDistrictId(item?._id);
                setLocationId("");
                setPositionNames((prev) => ({
                  ...prev,
                  district: item?.name,
                  location: "",
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
      <div className="mb-10 mt-4">
        <FormLabel title="Байршил" num={4} />
        <Select
          data={locationData}
          label={selectedLocalData?.location || "Байршил"}
          Item={({ data, onClick, ...props }) => {
            return (
              <button
                {...props}
                onClick={() => {
                  onClick();
                  setLocationId(data?._id);
                  setPositionNames((prev) => ({
                    ...prev,
                    location: data?.name,
                  }));
                  setSelectedLocalData((prev) => ({
                    ...prev,
                    location: data?.name,
                  }));
                }}
              >
                <p>{data?.name}</p>
                {props.children}
              </button>
            );
          }}
        />
      </div>

      <FormLine />
      <div className="flex md:flex-row flex-col md:gap-4 gap-8">
        <InputContainer>
          <FormLabel title="Хороо / Сум" />
          <Input
            value={selectedLocalData?.committee}
            ph="Хороо / Сум"
            onChange={(val) => {
              setCommitteeId(val);
              handleNamedata("committee", val);
            }}
          />
        </InputContainer>

        <InputContainer>
          <FormLabel title="Хотхон" />
          <Input
            ph="Хотхон"
            value={selectedLocalData?.town}
            onChange={(val) => {
              setCommitteeId(val);
              handleNamedata("town", val);
            }}
          />
        </InputContainer>
      </div>
    </div>
  );
};

const InputContainer = (props) => (
  <div className="md:w-1/2 w-full flex flex-col items-center">
    {props.children}
  </div>
);

// const Height = () => <div className="w-full h-10" />;

export default Step2;
