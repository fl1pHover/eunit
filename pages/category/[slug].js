import FilterLayout from "@/components/filter";
import AdContent from "@/components/home/adContent";
import urls from "@/constants/api";
import MainContainer from "@/layout/mainContainer";
import mergeNames from "@/util/mergeNames";
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
  useDisclosure,
} from "@chakra-ui/react";

import ProAdContent from "@/components/home/proAdContent";
import { ContainerX } from "@/lib/Container";
import SkeletonContent from "@/util/SkeletonContent";
import {
  GoogleMap,
  InfoWindow,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../context/auth";

const Category = ({ defaultAds, specialAds }) => {
  const router = useRouter();
  const [ads, setAds] = useState();
  const [sAds, setSAds] = useState();
  const { categories } = useAuth();
  const [category, setCategory] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  useEffect(() => {
    setIsLoading(true);
    if (defaultAds) setAds(defaultAds);
    if (specialAds) setSAds(specialAds);
    // console.log(defaultAds);
    setIsLoading(false);
  }, [defaultAds, specialAds]);

  const libraries = useMemo(() => ["places"], []);
  // const { categories, setAds } = useAuth();
  const [markerActive, setMarkerActive] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyC2u2OzBNo53GxJJdN3Oc_W6Yc42OmdZcE",
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
      lat: 47.91887307876936,
      lng: 106.91757202148438,
    }),
    []
  );
  const getData = async (id) => {
    try {
      if (router.query.slug)
        await axios
          .get(`${urls["test"]}/ad/category/${router.query.slug}/${id}`)
          .then((d) => {
            setAds(d.data);
          });
    } catch (error) {}
  };
  if (!isLoaded) {
    return <SkeletonContent />;
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
            <FilterLayout
              setDefaultAds={setAds}
              setSpecialAds={setSAds}
              data={router.query.slug}
              isOpenMap={onOpen}
            />
          )}

          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {sAds && (
              <ProAdContent
                data={sAds}
                tlc={toLowerCase}
                title={category ?? ""}
                showLink="hidden"
                inCat
                func={getData}
              />
            )}
          </Box>
          <Box>
            {/* //TODO Engiin zar */}
            {ads && (
              <AdContent
                data={ads}
                tlc={toLowerCase}
                title={category ?? ""}
                showLink="hidden"
                inCat
                func={getData}
              />
            )}
            {ads?.limit <= 0 && sAds?.limit <= 0 && (
              <ContainerX>
                <div className="grid h-[80vh] text-2xl place-items-center">
                  Зар байхгүй байна
                </div>
              </ContainerX>
            )}
          </Box>
        </div>
        {/* <CustomModal></CustomModal> */}
        <Modal onClose={onClose} isOpen={isOpen} isCentered size={"4xl"}>
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
                mapContainerStyle={{ width: "100%", height: "50vh" }}
              >
                {isLoaded &&
                  ads?.ads?.map((m, i) => {
                    return (
                      <div key={i}>
                        <MarkerF
                          position={{
                            lat: parseFloat(m.location?.lat ?? 47.74604),
                            lng: parseFloat(m.location?.lng ?? 107.341515),
                          }}
                          onMouseOver={() => setMarkerActive(i)}
                          animation={google.maps.Animation.DROP}
                          className={mergeNames("group")}
                        >
                          {markerActive == i && (
                            <InfoWindow
                              position={{
                                lat: parseFloat(m.location?.lat ?? 47.74604),
                                lng: parseFloat(m.location?.lng ?? 107.341515),
                              }}
                            >
                              <div
                                onClick={() => router.push(`/ad/${m.num}`)}
                                className={mergeNames(
                                  "h-[125px] aspect-4/3 flex flex-col cursor-pointer justify-end relative",
                                  "group-hover:block "
                                )}
                              >
                                <Image
                                  src={
                                    m.images[0] ?? "/images/HeaderSlider/1.jpg"
                                  }
                                  alt="map image"
                                  className={mergeNames(
                                    "absolute top-0 left-0 object-cover w-full h-full ",
                                    ""
                                  )}
                                />
                                <div className="absolute top-0 left-0 object-cover w-full h-full bg-gradient-to-b from-slate-700/0 via-slate-700/50 to-slate-900/100 "></div>
                                <p className="z-10 text-base font-bold text-white">
                                  {m.title}
                                </p>
                                <p className="z-10 text-base font-bold text-white">
                                  {
                                    m.filters.filter(
                                      (f) => f.type == "price"
                                    )[0]?.input
                                  }
                                </p>
                              </div>
                            </InfoWindow>
                          )}
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
  );
};

export default Category;

export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;
  const res = await fetch(`${urls["test"]}/ad/category/${slug}/${0}`);
  const ads = await res.json();
  return {
    props: { defaultAds: ads.defaultAds, specialAds: ads.specialAds },
  };
}
