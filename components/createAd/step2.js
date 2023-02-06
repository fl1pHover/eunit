import Input from '@/lib/Input';
import { Box, Select } from '@chakra-ui/react';
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
      lat: 47.9186367,
      lng: 106.9164856,
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
        <div className="px-4 mt-4 mb-10 ">
          <FormLabel title="Байршил" num={4} />
          <div className="flex flex-col justify-center w-full mx-auto md:w-1/2 lg:w-1/3">
            <Select
              className="border-2 border-blue-400 rounded-full "
              onChange={(e) => {
                e.target.value != 'Бусад'
                  ? setLocationId(locationData[e.target.value].name)
                  : setType((prev) => ({ ...prev, location: false }));
              }}
              placeholder="Байршил"
            >
              {locationData.map((l, i) => {
                return i == locationData.length - 1 ? (
                  <>
                    <option key={i} value={i}>
                      {l.name}
                    </option>
                    <option key={i} value={'Бусад'}>
                      Бусад
                    </option>
                  </>
                ) : (
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
                  ph="Байршил"
                  onChange={(e) => setLocationId(e.target.value)}
                  className="mx-auto"
                />
              </>
            )}
          </div>
        </div>
      )}

      <FormLine />
      {positions.location_id && (
        <div className="grid grid-cols-1 gap-8 px-4 xl:px-20 md:grid-cols-2 md:gap-4">
          <div className="flex flex-col w-full lg:w-2/3">
            <div className="flex flex-col items-center">
              <FormLabel title="Хороо / Сум" />
              {
                <>
                  <Select
                    className="w-full border-2 border-blue-400 rounded-full"
                    placeholder="Хороо / Сум"
                    onChange={(e) => {
                      e.target.value == 'Бусад'
                        ? setType((prev) => ({ ...prev, committee: false }))
                        : setCommitteeId(e.target.value);
                    }}
                  >
                    {[...Array(31).keys()].map((c, i) => {
                      if (c == 30) {
                        return (
                          <option value={`Бусад`} key={i}>
                            Бусад
                          </option>
                        );
                      } else {
                        return (
                          <option value={`${c + 1}-р хороо`} key={i}>
                            {c + 1}-р хороо
                          </option>
                        );
                      }
                    })}
                  </Select>
                  <Box h={4} />
                  {!type.committee && (
                    <Input
                      className="md:w-full"
                      placeholder="Хороо / Сум"
                      onChange={(val) => {
                        setCommitteeId(val.target.value);
                      }}
                    />
                  )}
                </>
              }
            </div>
            {town != '' && (
              <div className="flex flex-col items-center">
                <FormLabel title="Хотхон" />
                {
                  <>
                    <Select
                      className="w-full border-2 border-blue-400 rounded-full"
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
                          className="w-full md:w-2/3"
                          ph="Хотхон"
                          onChange={(val) => {
                            setTownId(val.target.value);
                          }}
                        />
                      </>
                    )}
                  </>
                }
              </div>
            )}
          </div>
          <GoogleMap
            className="aspect-video"
            options={mapOptions}
            onClick={(e) => {
              setMap(e.latLng.toJSON());
            }}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{ width: '100%', height: '40vh' }}
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
