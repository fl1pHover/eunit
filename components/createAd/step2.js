import { Box, Input, Select } from '@chakra-ui/react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React, { useMemo, useState } from 'react';
import ButtonSelectItem from './formButtonSelectItem';
import FormLabel from './formLabel';
import FormLine from './formLine';

const Step2 = ({
  map,
  setMap,
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

  const libraries = useMemo(() => ['places'], []);
  // const { categories, setAds } = useAuth();
  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE',
    libraries: libraries,
  });
  const mapOptions = useMemo(
    () => ({
      disableDefaultUI: true,
      // clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: 47.74604,
      lng: 107.341515,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }

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
          <>
            <Select
              onChange={(e) => {
                locationData[e.target.value].name != 'Бусад'
                  ? setLocationId(locationData[e.target.value].name)
                  : setType((prev) => ({ ...prev, location: false }));
              }}
              placeholder="Байршил"
            >
              {locationData.map((l, i) => {
                return <option value={i}>{l.name}</option>;
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
          </>
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
          <GoogleMap
            options={mapOptions}
            onClick={(e) => {
              setMap(e.latLng.toJSON());
            }}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '100%', height: '50vh' }}
          >
            {isLoaded && map && (
              <MarkerF
                position={map}
                onClick={() => setMarkerActive(i)}
                animation={google.maps.Animation.DROP}
              />
            )}
          </GoogleMap>
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
