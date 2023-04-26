import mergeNames from "@/util/mergeNames";
import { Heading } from "@chakra-ui/react";

const txthover = "font-semibold text-gray-500 duration-100 hover:text-gray-800";
const colSpan = "grid w-full grid-cols-5 gap-3 font-bold text-center";

const WHistory = ({ body, user }) => {
  return (
    <div className="w-full max-w-[800px] px-6 py-4 shadow-md border-2 border-slate-200/30 rounded-xl mx-auto">
      <Heading variant="mediumHeading">Гүйлгээний түүх</Heading>
      <div className="flex flex-col w-full gap-3 mt-4">
        <div className="flex items-center gap-4">
          <p className="font-semibold">№</p>
          <div className={mergeNames(colSpan, "text-lg text-gray-500")}>
            <p className="text-left ">Илгээгч</p>
            <p className="">Хүлээн авагч</p>
            <p className="col-span-2 ">Мэссэж</p>
            <p className="text-right text-blue-700">E-unit</p>
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
              <div
                className={mergeNames(
                  colSpan,
                  "py-2 font-normal text-gray-500"
                )}
              >
                <a
                  href={"/account/" + ph.sender?.id}
                  target="_blank"
                  className={mergeNames(txthover)}
                >
                  {ph.sender?.username}
                </a>
                <a
                  href={"/account/" + ph.receiver?.id}
                  target="_blank"
                  className={mergeNames(txthover, "text-center")}
                >
                  {ph.receiver?.username}
                </a>
                <p className="col-span-2 font-semibold truncate">
                  {ph.message}
                </p>
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
  );
};

export default WHistory;
