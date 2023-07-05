import AdContent from "@/components/home/adContent";
import ProAdContent from "@/components/home/proAdContent";
import { useAuth } from "@/context/auth";
import MainContainer from "@/layout/mainContainer";
import { ContainerX } from "@/lib/Container";
import { Box } from "@chakra-ui/react";

const SearchedAds = () => {
  const { defaultAds, specialAds } = useAuth();
  const toLowerCase = (text) => {
    if (text) {
      return text.toLowerCase();
    }
  };
  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {specialAds && (
              <ProAdContent
                data={specialAds}
                tlc={toLowerCase}
                title={""}
                showLink="hidden"
                inCat
                func={() => {}}
              />
            )}
          </Box>
          <Box>
            {/* //TODO Engiin zar */}
            {defaultAds && (
              <AdContent
                data={defaultAds}
                tlc={toLowerCase}
                title={""}
                showLink="hidden"
                inCat
                func={() => {}}
              />
            )}
            {defaultAds?.limit <= 0 && specialAds?.limit <= 0 && (
              <ContainerX>
                <div className="grid h-[80vh] text-2xl place-items-center">
                  Зар байхгүй байна
                </div>
              </ContainerX>
            )}
          </Box>
        </div>
        {/* <CustomModal></CustomModal> */}
      </MainContainer>
    </Box>
  );
};

export default SearchedAds;
