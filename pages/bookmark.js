import { BomSelect } from '@/util/BomInput';
import { Box, Heading } from '@chakra-ui/react';
import MainContainer from '../layout/mainContainer';
import ProductCard from '../util/productCard';

const Bookmark = () => {
  return (
    <Box as="section" id="bookmark">
      <MainContainer>
        <div className="relative flex flex-row gap-3 py-2">
          {/* //TODO Filter Box */}
          {/* <FilterLayout /> */}
          <div className="min-h-[600px] basis-1/4 p-5 bg-white rounded-xl shadow-md sticky ">
          <BomSelect placeholder="Үл хөдлөх" onChange={null} value={null}>
              <option value={'option1'}>coming</option>
            </BomSelect>
          </div>

          {/* //TODO Filter box end */}

          {/* //TODO Main product */}
          <div className="basis-3/4" maxWidth={'75%'}>
            {/* <SwiperHeader /> */}

            <Heading variant={'mediumHeading'} my={3}>
              Онцгой зар
            </Heading>

            <div className="grid justify-center w-full gap-3 grid-rows-layout">
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
              <ProductCard />
            </div>
          </div>
        </div>
      </MainContainer>
    </Box>
  );
};

export default Bookmark;
