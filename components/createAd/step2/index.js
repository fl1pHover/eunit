import FormTitle from '@/components/createAd/title';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import React, { useMemo, useState } from 'react';
import { FieldCommittee } from './fieldCommittee';

// KHOROO AND SUM
import FieldDistrict from './fieldDistrict';
import FieldLocation from './fieldLocation';
import FieldTown from './fieldTown';

const Step2 = ({
  types,
  districts = [],
  locations = [],
  map,
  setMap,
  positions = {},
  setPositions = () => {},
  positionNames = {},
  selectedLocalData,
  setSelectedLocalData,
  setPositionNames = () => {},
}) => {
  // SAVING LOCAL NAMES -> AUTOSAVING INFORMARION LOCALLY

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

  const handleKhorooSum = (val) => {
    // console.log("val", val);
    setPositions((prev) => ({
      ...prev,
      committee_id: val,
    }));
    handleNamedata('committee', val);
  };
  const libraries = useMemo(() => ['places'], []);

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
  // BUSAD GSN DATA HURJ IREHGUI BN: LOCATION DEER
  // BUSAD IIG SONGOVOL INPUT GARJ IRNE GJ YRIJ BSN
  return (
    <>
      <FormTitle>Байршил</FormTitle>
      <div className="bg-white min-h-[40vh] rounded-xl py-10 md:px-10 px-2">
        {/* DISTRICT CUSTOM SELECTION */}
        <FieldDistrict
          {...{ selectedLocalData, districts, setPositions, handleNamedata }}
        />
        {/* LOCATION - BAIRSHIL */}
        {selectedLocalData.district && (
          <FieldLocation
            {...{
              locationData,
              setPositions,
              handleNamedata,
              selectedLocalData,
            }}
          />
        )}
        {/* KHOROO SUM(COMMITTEE) and HOTHON TOWN*/}
        {selectedLocalData.location && (
          <div className="flex flex-col gap-8 mb-10 md:flex-row md:justify-evenly md:gap-4">
            <FieldCommittee
              {...{
                setPositions,
                locationData,
                handleNamedata,
                selectedLocalData,
              }}
            />

            {types?.subCategoryId !== 'land' &&
              types?.subCategoryId !== 'office' && (
                <FieldTown
                  {...{ selectedLocalData, handleNamedata, setPositions }}
                />
              )}
          </div>
        )}

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
      </div>
    </>
  );
};

export default Step2;
