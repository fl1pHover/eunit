import React from "react";

import {
     AspectRatio,
     Box,
     Flex,
     Grid,
     GridItem,
     Heading,
     Skeleton,
} from "@chakra-ui/react";

import MainContainer from "../../layout/mainContainer";

import ProductCard from "../../util/productCard";

const Asd = <ProductCard />;
const array = [...Array(10)];

// const AdCard = () => {
//      return <GridItem></GridItem>;
// };

const AdContent = () => {
     return (
          <MainContainer>
               <Heading>Үл хөдлөх хөрөнгө</Heading>
               <Grid templateColumns={"repeat(6,1fr)"} gap={7} py={5}>
                    {array.map((_, index) => {
                         <GridItem key={index}>{Asd}</GridItem>;
                    })}
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
                    <Skeleton />
               </Grid>
          </MainContainer>
     );
};

export default AdContent;
