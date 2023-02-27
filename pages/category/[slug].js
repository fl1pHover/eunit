import FilterLayout from '@/components/filter';
import AdContent from '@/components/home/adContent';
import urls from '@/constants/api';
import MainContainer from '@/layout/mainContainer';
import mergeNames from '@/util/mergeNames';
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure
} from '@chakra-ui/react';

import { ContainerX } from '@/lib/Container';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript
} from '@react-google-maps/api';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/auth';

const Category = ({ propAds }) => {
  const router = useRouter();
  const { categories, ads, setAds } = useAuth();
  const [category, setCategory] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    setAds(propAds?.ads);
  }, [propAds]);

  const [isLoading, setIsLoading] = useState(false);
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
      clickableIcons: true,
      scrollwheel: true,
    }),
    []
  );
  const mapCenter = useMemo(
    () => ({
      lat: ads ? parseFloat(ads[0]?.location?.lat ?? 47.74604) : 47.74604,
      lng: ads ? parseFloat(ads[0]?.location?.lng ?? 107.341515) : 107.341515,
    }),
    []
  );
  if (!isLoaded) {
    return <p>Loading...</p>;
  }
  function createKey(location) {
    return location.lat + location.lng;
  }

  return ads?.length > 0 ? (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          {router.query?.slug && (
            <FilterLayout data={router.query.slug} isOpenMap={onOpen} />
          )}

          {/* //TODO Filter box end */}

          {/* //TODO Main product */}
          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* <SwiperHeader /> */}

            {/* //TODO Ontsgoi zar */}
            {/* //TODO Ontsgoi zar */}
            {/* //TODO Ontsgoi zar */}

            {/* //TODO Engiin zar */}

            <AdContent
              data={ads}
              tlc={toLowerCase}
              title={category ?? ''}
              showLink="hidden"
            />
          </Box>
        </div>
        {/* <CustomModal></CustomModal> */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'4xl'}>
          <ModalContent>
            <ModalHeader>Maps</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <GoogleMap
                options={mapOptions}
                onClick={(e) => {
                  // setMap(e.latLng.toJSON());
                  // console.log(e.latLng.toJSON());
                }}
                zoom={14}
                center={mapCenter}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                mapContainerStyle={{ width: '100%', height: '50vh' }}
              >
                {isLoaded &&
                  ads?.map((m, i) => {
                    return (
                      <div className="" key={i}>
                        <MarkerF
                          position={{
                            lat: parseFloat(m.location?.lat ?? 47.74604),
                            lng: parseFloat(m.location?.lng ?? 107.341515),
                          }}
                          onClick={() => setMarkerActive(i)}
                          animation={google.maps.Animation.DROP}
                          className={mergeNames('group')}
                        >
                          <InfoWindow
                            position={{
                              lat: parseFloat(m.location?.lat ?? 47.74604),
                              lng: parseFloat(m.location?.lng ?? 107.341515),
                            }}
                            onLoad={(info) => {}}
                          >
                            {/* end zasna */}

                            {markerActive == i ? (
                              <div
                                onClick={() => router.push(`/product/${m.num}`)}
                                className={mergeNames(
                                  ' h-[100px] aspect-video flex flex-col cursor-pointer justify-end',
                                  'group-hover:block'
                                )}
                              >
                                <Image
                                  src="/images/404.png"
                                  alt="map image"
                                  className={mergeNames(
                                    'absolute top-0 left-0 object-cover w-full h-full ',
                                    'bg-gradient-to-b from-slate-700/0 via-slate-700/80 to-slate-900/100'
                                  )}
                                />
                                <p className="z-10 text-base font-bold text-white">
                                  {m.title}
                                </p>
                              </div>
                            ) : (
                              <div />
                            )}
                          </InfoWindow>
                        </MarkerF>
                      </div>
                    );
                  })}
              </GoogleMap>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainContainer>
    </Box>
  ) : (
    <ContainerX>
      <div className="grid h-[80vh] text-2xl place-items-center">
        Зар байхгүй байна
      </div>
    </ContainerX>
  );
};

export default Category;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;
  const res = await fetch(`${urls['test']}/ad/category/${slug}/${0}`);
  const ads = await res.json();
  return {
    props: {
      propAds: ads,
    },
  };
}
