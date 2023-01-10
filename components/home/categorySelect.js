import {
  Box,
  Grid,
  GridItem,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineCar } from "react-icons/ai";
import { BsBuilding, BsPhone } from "react-icons/bs";
import { CgSmartHomeWashMachine } from "react-icons/cg";
import { MdComputer } from "react-icons/md";
import { RiHomeSmile2Line } from "react-icons/ri";
import { useAuth } from "../../context/auth";

import MainContainer from "../../layout/mainContainer";

const CategorySelect = () => {
  const { categories } = useAuth();
  return (
    <Box py={"50px"}>
      <MainContainer>
        <Grid
          templateColumns={{
            base: "repeat(2,1fr)",
            sm: "repeat(3,1fr)",
            lg: "repeat(6,1fr)",
          }}
          gap={5}
        >
          {categories?.map(({ ...props }, index) => {
            return (
              <>
                {/* Categoryiin default menug ni hamgiin ehnii submenu eer avna */}

                <Link
                  key={index}
                  href={props.href == 'realState' ? `/category/apertment` : '/'}
                  p={1}
                  mt={0}
                >
                  <GridItem
                    bgColor="white"
                    py={8}
                    rounded={20}
                    boxShadow="md"
                    transition={"0.3s ease"}
                    _hover={{
                      boxShadow: "xl",
                    }}
                    textAlign={"center"}
                    backgroundImage={`/images/category/${props.href}.jpg`}
                    backgroundPosition={"center"}
                    backgroundSize="cover"
                    className="card"
                    overflow={"hidden"}
                  >
                    <Stack
                      key={index}
                      display={"flex"}
                      alignItems={"center"}
                      height="100%"
                      position={"relative"}
                      zIndex={"2"}
                      color="white"
                    >
                      <Text fontSize={"50px"}>
                        {props.href == "realState" ? (
                          <BsBuilding />
                        ) : props.href == "vehicle" ? (
                          <AiOutlineCar />
                        ) : props.href == "computer" ? (
                          <MdComputer />
                        ) : props.href == "phone" ? (
                          <BsPhone />
                        ) : props.href == "electronics" ? (
                          <CgSmartHomeWashMachine />
                        ) : (
                          <RiHomeSmile2Line />
                        )}
                      </Text>
                      <Stack
                        mt={"15px !important"}
                        direction="column"
                        justifyContent={"space-between"}
                        height={"100%"}
                      >
                        <Heading variant={"smallHeading"} height="40px">
                          {props.name}
                        </Heading>
                      </Stack>
                    </Stack>
                  </GridItem>
                </Link>
              </>
            );
          })}
        </Grid>
      </MainContainer>
    </Box>
  );
};

export default CategorySelect;
