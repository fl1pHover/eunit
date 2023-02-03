import { Box, Grid, Heading, Image, Stack } from '@chakra-ui/react';
import MainContainer from '../../layout/mainContainer';

import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FilterLayout from '../../components/filter';
import AdContent from '../../components/home/adContent';
import urls from '../../constants/api';
import { useAuth } from '../../context/auth';

const Category = () => {
  const { categories, ads, setAds } = useAuth();
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

  return (
    <Box my={5} as="section" id="category">
      <MainContainer>
        <Stack direction={'row'} py={2} gap={3}>
          {/* //TODO Filter Box */}
          {router.query?.slug && <FilterLayout data={router.query.slug} />}

          {/* //TODO Filter box end */}

          {/* //TODO Main product */}
          <Box maxWidth={'75%'} flex="0 0 75%" borderRadius="5px">
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

            <Box>
              <Heading variant={'mediumHeading'} my={3}>
                Онцгой зар
              </Heading>
              <Grid
                direction={'row'}
                templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
                rowGap={5}
                gap={3}
                width="100%"
                justifyContent={'center'}
              >
                {/* йыбйыб */}
                {/* йыбйыб */}
                {/* йыбйыб */}
              </Grid>
            </Box>

            {/* //TODO Engiin zar */}

            {ads && (
              <AdContent data={ads} tlc={toLowerCase} title={category ?? ''} />
            )}
          </Box>
        </Stack>
      </MainContainer>
    </Box>
  );
};

export default Category;
