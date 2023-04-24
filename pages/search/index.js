import AdContent from '@/components/home/adContent';
import { useAuth } from '@/context/auth';
import MainContainer from '@/layout/mainContainer';
import { ContainerX } from '@/lib/Container';
import { Box } from '@chakra-ui/react';

const SearchedAds = () => {
  const { ads } = useAuth();

  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <div className="relative flex flex-col gap-3 p-2">
          {/* //TODO Filter Box */}
          <Box className="max-w-[100%] w-full rounded-[5px]">
            {/* //TODO Engiin zar */}
            {ads?.ads?.length > 0 ? (
              <AdContent data={ads} title={''} showLink="hidden" inCat />
            ) : (
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
