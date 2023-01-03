import { HStack } from "@chakra-ui/react";
import React from "react";

import Text from "../../lib/Text";
import { ContainerX } from "../../lib/Container";

const Higher = () => {
  return (
    <div className="bg-mainBlossom/90 py-1 md:block hidden">
      <ContainerX>
        <HStack justifyContent={"space-between"}>
          <Text classname="text-white">Welcome to BOM Website</Text>
          <div className="flex flex-row gap-8">
            <Text classname="text-white">Холбоо барих: 9999-9999</Text>
            <Text classname="text-white">Ажлын цаг 09:00-18:00</Text>
            <Text classname="text-white">Тусламж</Text>
          </div>
        </HStack>
      </ContainerX>
    </div>
  );
};

export default Higher;
