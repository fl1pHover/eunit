import { Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import MainContainer from "../layout/mainContainer";

const PageNot = () => {
  return (
    <>
      <MainContainer>
        <Stack
          display={"flex"}
          justifyContent={"center"}
          width={"100%"}
          textAlign={"center"}
          my="10vh"
        >
          <Image
            src="/images/404.png"
            alt="error image"
            width={{
              base: "80%",
              md: "70%",
              lg: "60%",
              xl: "40%",
            }}
            mx={"auto !important"}
          />
          <Text color={"grey"} fontSize="2em">
            Уучлаарай. Таны хайсан хуудас байхгүй байна.
          </Text>
        </Stack>
      </MainContainer>
    </>
  );
};

export default PageNot;
