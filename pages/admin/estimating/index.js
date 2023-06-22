import EstimatedCard from "@/components/estimator/EstimatedCard";
import urls from "@/constants/api";
import MainContainer from "@/layout/mainContainer";
import { Radio, RadioGroup, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";

import { useEffect, useState } from "react";

const Estimating = () => {
  const token = getCookie("token");
  const [estimates, setEstimates] = useState([]);
  //   types
  //   export enum EstimateStatus {
  //     pending = 'pending',
  //     estimated = 'estimated',
  //     deleted = 'deleted',
  //     returned = 'returned',
  //   }
  const toast = useToast();
  const updateEstimate = async (id, status = "finished") => {
    try {
      await axios
        .get(`${urls["test"]}/estimate/update/${status}/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((d) => {
          toast({
            title: "Амжилттай.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
          // router.reload();
        });
    } catch (error) {
      console.error(error);
    }
  };

  const getEstimate = async (check) => {
    await axios
      .get(`${urls["test"]}/estimate/${check}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((d) => setEstimates(d.data));
  };

  useEffect(() => {
    if (token) getEstimate("pending");
  }, [token]);
  return (
    <div className="mt-10">
      <MainContainer>
        <RadioGroup className="flex flex-col justify-end" defaultValue="2">
          <Radio
            colorScheme="blue"
            className="font-bold text-blue-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate("estimated", 0);

                // setNum(0);
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
                getEstimate("pending", 0);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="2"
          >
            Хүлээгдэж буй үнэлгээ
          </Radio>
          <Radio
            colorScheme="green"
            className="font-bold text-green-400 whitespace-nowrap"
            onChange={(e) => {
              if (e.target.checked) {
                getEstimate("finished", 0);
                // setNum(0);
                // setCheck("checking");
              }
            }}
            value="3"
          >
            Үнэлж дууссан
          </Radio>
        </RadioGroup>
        <div className="flex bg-white p-5 my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col w-full gap-2">
            {estimates &&
              estimates.map((est, i) => {
                return (
                  <div className="flex items-center gap-2">
                    <h1>{i + 1}</h1>
                    <EstimatedCard
                      est={est}
                      key={i}
                      adminBtn={
                        est.status == "estimated" ? (
                          <button
                            onClick={() => updateEstimate(est._id)}
                            className="px-5 mx-auto my-4"
                          >
                            Дууссан
                          </button>
                        ) : (
                          <></>
                        )
                      }
                    />
                  </div>
                );
              })}

            <div className="flex flex-col"></div>
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Estimating;

const colSize = "flex flex-col min-w-[250px]   border-r border-gray-400";
