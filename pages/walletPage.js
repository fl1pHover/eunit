import urls from "@/constants/api";
import mergeNames from "@/util/mergeNames";
import { Heading, Image, useToast } from "@chakra-ui/react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { STYLES } from "../styles";

const WalletPage = ({ user }) => {
  const [point, setPoint] = useState({
    email: "",
    point: "",
    message: "",
  });
  const toast = useToast();
  const token = getCookie("token");
  const router = useRouter();
  const sendPoint = async () => {
    try {
      if (token && point.email && point.point) {
        await axios
          .get(
            `${
              urls["test"]
            }/user/point/${point.email.toLowerCase()}/${parseFloat(
              point.point
            )}/default/{message}?message=${point.message}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Access-Control-Allow-Headers": "*",
              },
            }
          )
          .then((d) => {
            if (d.data.message == "success") {
              toast({
                title: "Амжилттай илгээлээ.",
                status: "success",
                duration: 1000,
                isClosable: true,
              });
            }
            if (d.data.message == "not found receiver") {
              toast({
                title: "Хүлээн авагч олдсонгүй",
                status: "warning",
                duration: 1000,
                isClosable: true,
              });
            }
            if (d.data.message == "not enough points") {
              toast({
                title: "Үлдэгдэл хүрэлцэхгүй байна",
                status: "warning",
                duration: 1000,
                isClosable: true,
              });
            }
            router.reload();
          });
      }
    } catch (error) {}
  };

  return (
    <div className="flex flex-col gap-10">
      <div
        className={mergeNames(
          "grid xl:grid-cols-2 max-w-[800px] w-full grid-cols-1 mx-auto gap-10 mt-5"
        )}
      >
        {/* Card */}
        <div className="flex flex-col">
          <div className="font-bold w-full  h-[250px] bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-5 flex flex-col justify-between mx-auto text-white">
            <div className="flex justify-between">
              <h1 className="">BOM хэтэвч</h1>
              <Image
                alt="bom logo"
                src="/images/logo/bom-white.png"
                className="w-[30px]"
              />
            </div>
            <h1 className="">Нэр</h1>
            <div>
              <h1 className="text-white/80">Үлдэгдэл</h1>
              <h1 className="text-xl">{user?.point ?? 0} ₮</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center w-full gap-2 mx-auto">
          <input
            placeholder="Шилжүүлэх хүний и-мэйл"
            className={mergeNames(STYLES.input, "w-full rounded-md")}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, email: e.target.value }));
            }}
            required
          />

          <input
            placeholder="Дүн"
            className={mergeNames(STYLES.input, "w-full rounded-md")}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, point: e.target.value }));
            }}
            required
          />

          <textarea
            placeholder="Мэссэж"
            maxLength={200}
            className={mergeNames(STYLES.input, "rounded-md col-span-full")}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, message: e.target.value }));
            }}
            required
          />
          <div>
            <button
              className={mergeNames(
                STYLES.blueButton,
                "col-span-full w-full p-2"
              )}
              onClick={() => sendPoint()}
            >
              Шилжүүлэх
            </button>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[800px] px-6 py-4 shadow-md border-2 border-slate-200/30 rounded-xl mx-auto">
        <Heading variant="mediumHeading">Гүйлгээний түүх</Heading>
        <div className="flex flex-col w-full gap-3 mt-4">
          <div className="flex items-center gap-4">
            <p className="font-semibold">№</p>
            <div className="flex justify-between w-full text-lg font-bold">
              <button className="text-gray-500 ">Илгээгч</button>
              <button className="text-gray-500 ">Хүлээн авагч</button>
              <p className="text-blue-700 ">Eunit</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full mt-4">
          {user?.pointHistory?.map((ph, i) => {
            return (
              <div
                className="flex items-center gap-4 border-t-2 border-gray-200"
                key={i}
              >
                <p className="font-semibold">{i + 1}</p>
                <div className="grid w-full grid-cols-3 py-2">
                  <a
                    href={"/account/" + ph.sender?.id}
                    target="_blank"
                    className="font-semibold text-gray-500 "
                  >
                    {ph.sender?.username}
                  </a>
                  <a
                    href={"/account/" + ph.receiver?.id}
                    target="_blank"
                    className="font-semibold text-center text-gray-500"
                  >
                    {ph.receiver?.username}
                  </a>
                  <p className="font-bold text-right text-blue-700 ">
                    {ph.type == "sender" ? "-" : "+"}
                    {ph.point}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
