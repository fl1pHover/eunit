import {
  Box,
  Button,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@chakra-ui/react';
import MainContainer from '../../layout/mainContainer';

import CustomModal from '@/util/CustomModal';
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from '@react-google-maps/api';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import FilterLayout from '../../components/filter';
import AdContent from '../../components/home/adContent';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';

const Category = () => {
  const { categories, ads, setAds } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [category, setCategory] = useState();
  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };

  useEffect(() => {
    categories?.map((c) => {
      c.subCategory?.map((s) => {
        if (s.href == router.query.slug) {
          setCategory(s.name);
          axios
            .get(`${urls['test']}/ad/category/{id}?id=${s._id}`)
            .then((data) => {
              setAds(data.data);
            });
        }
      });
    });
  }, [router.query, categories]);
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
      // clickableIcons: true,
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
  return (
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
            <Image
              src="/images/HeaderSlider/1.jpg"
              height={'400px'}
              width="100%"
              objectFit={'cover'}
              alt="image"
            />

            {/* //TODO Ontsgoi zar */}
            {/* //TODO Ontsgoi zar */}
            {/* //TODO Ontsgoi zar */}

            {/* //TODO Engiin zar */}

            {ads && (
              <AdContent
                data={ads}
                tlc={toLowerCase}
                title={category ?? ''}
                showLink="hidden"
              />
            )}
          </Box>
        </div>
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={'4xl'}>
          <ModalContent>
            <ModalHeader>Maps</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {ads && (
                <GoogleMap
                  options={mapOptions}
                  onClick={(e) => {
                    // setMap(e.latLng.toJSON());
                    console.log(e.latLng.toJSON());
                  }}
                  zoom={14}
                  center={mapCenter}
                  mapTypeId={google.maps.MapTypeId.ROADMAP}
                  mapContainerStyle={{ width: '100%', height: '50vh' }}
                >
                  {isLoaded &&
                    ads?.map((m, i) => {
                      return (
                        <HStack key={i}>
                          <MarkerF
                            position={{
                              lat: parseFloat(m.location?.lat ?? 47.74604),
                              lng: parseFloat(m.location?.lng ?? 107.341515),
                            }}
                            onClick={() => setMarkerActive(i)}
                            animation={google.maps.Animation.DROP}
                          >
                            <InfoWindow
                              position={{
                                lat: parseFloat(m.location?.lat ?? 47.74604),
                                lng: parseFloat(m.location?.lng ?? 107.341515),
                              }}
                              onLoad={(info) => console.log(info)}
                            >
                              {/* end zasna */}
                              <Button
                                onClick={() => router.push(`/product/${m.num}`)}
                              >
                                <div>{m.title}</div>
                              </Button>
                            </InfoWindow>
                          </MarkerF>
                        </HStack>
                      );
                    })}
                </GoogleMap>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </MainContainer>
    </Box>
  );
};

export default Category;
