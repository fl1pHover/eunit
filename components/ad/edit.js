import { LoadingButton } from '@/lib/Button';
import CustomModal from '@/util/CustomModal';
import mergeNames from '@/util/mergeNames';
import { Box, Input, useDisclosure } from '@chakra-ui/react';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { Textarea } from 'flowbite-react';
import { ProductInfo } from 'pages/product/[slug]';
import { useMemo, useState } from 'react';
import FieldPhotoUpload from '../createAd/step3/fieldPhotoUpload';

const EditAd = ({
  onNext = () => {},
  data,
  setData,
  admin = false,
  ads = [],
  setGeneralData,
  setImages,
  generalData,
  children,
}) => {
  const libraries = useMemo(() => ['places'], []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [markerActive, setMarkerActive] = useState(null);
  const [loading, setLoading] = useState(false);

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
      lat: data?.location?.lat ?? 47.91887307876936,
      lng: data?.location?.lng ?? 106.91757202148438,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  let dummyData = { ...data };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      btnOpen={
        <p className="w-full text-center">{children ?? 'Зараа засах'}</p>
      }
      onclick={onNext}
      btnClose={<LoadingButton text="Засах" isLoading={loading} />}
      btnClose2="Буцах"
      header="Баталгаажуулах хэсэг"
    >
      <Box maxWidth={'100%'} flex="0 0 100%" borderRadius="5px">
        <Box className="p-3 bg-white shadow-md md:p-10 rounded-xl">
          {/*Product */}
          {
            <Input
              variant={'mediumHeading'}
              onChange={(e) => {
                if (!admin) {
                  dummyData.title = e.target.value;
                  setData(dummyData);
                } else {
                  let d = { ...ads };
                  d.ads.find((a) => data == a).title = e.target.value;

                  setData(d);
                }
              }}
              mb={5}
              value={data.title}
            />
          }

          {/* product image and information */}
          <div className="flex flex-col ">
            <div>
              {data?.images && (
                <FieldPhotoUpload
                  setImages={setImages}
                  generalData={generalData}
                  setGeneralData={setGeneralData}
                />
              )}

              <Box h={4} />
              <Textarea
                mt={5}
                onChange={(e) => {
                  dummyData.description = e.target.value;
                  if (!admin) {
                    setData(dummyData);
                  } else {
                    let d = { ...ads };
                    d.ads.find((a) => data == a).title = e.target.value;

                    setData(d);
                  }
                }}
              >
                {data.description}
              </Textarea>
            </div>
            <Box h={4} />

            {data && (
              <div className="grid grid-cols-2 gap-3">
                <p className="text-xl font-bold col-span-full">
                  Ерөнхий мэдээлэл
                </p>

                {data.filters?.map((p, i) => {
                  return (
                    <ProductInfo
                      key={i}
                      title={p.name}
                      id={p.parent}
                      value={p.input}
                      edit={true}
                      href={false}
                      type={p.type}
                      admin={admin}
                      setEditData={setData}
                      editData={data}
                    />
                  );
                })}
              </div>
            )}

            <GoogleMap
              onClick={(e) => {
                dummyData.location = e.latLng.toJSON();
                if (!admin) {
                  setData(dummyData);
                } else {
                  data = dummyData;
                }
              }}
              options={mapOptions}
              zoom={14}
              center={mapCenter}
              mapTypeId={google.maps.MapTypeId.ROADMAP}
              mapContainerStyle={{ width: '100%', height: '50vh' }}
            >
              {isLoaded && (
                <div>
                  <MarkerF
                    position={{
                      lat: parseFloat(data?.location?.lat ?? 47.74604),
                      lng: parseFloat(data?.location?.lng ?? 107.341515),
                    }}
                    animation={google.maps.Animation.DROP}
                    className={mergeNames('group')}
                  />
                </div>
              )}
            </GoogleMap>
          </div>
        </Box>
      </Box>
    </CustomModal>
  );
};
export default EditAd;
