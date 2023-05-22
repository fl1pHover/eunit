import MainContainer from "@/layout/mainContainer";
import { ContainerX } from "@/lib/Container";
import { Radio, RadioGroup } from "@chakra-ui/react";

import React from "react";
import { useEffect } from "react";

const Estimating = () => {
    const getEstimate = () => {
        
    }
    useEffect(() => {
        
    }, [])
  return (
    <div className="">
      <MainContainer>
        <div className="flex bg-white my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col">Үнэлгээ</div>
        </div>
        <RadioGroup className="flex flex-col justify-end" defaultValue="2">
              <Radio
                colorScheme="green"
                className="font-bold text-green-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds("created", 0);
                    setCheck("created");
                    setNum(0);
                  }
                }}
                value="1"
              >
                Үнэлсэн үнэлгээ
              </Radio>
              <Radio
                colorScheme="yellow"
                className="font-bold text-yellow-400 whitespace-nowrap"
                onChange={(e) => {
                  if (e.target.checked) {
                    getAds("checking", 0);
                    setNum(0);
                    setCheck("checking");
                  }
                }}
                value="2"
              >
                Хүлээгдэж буй үнэлгээ
              </Radio>
            </RadioGroup>
      </MainContainer>
    </div>
  );
};

export default Estimating;
