import { STYLES } from "@/styles/index";
import mergeNames from "@/util/mergeNames";
import { Avatar } from "@chakra-ui/react";
import currency from "currency.js";
import { useRouter } from "next/router";
import { AiFillMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";

const UserInfo = ({ phone, username, agent, avatar, email, id }) => {
  const router = useRouter();
  return (
    <div
      className={mergeNames(
        "flex flex-col items-center justify-between p-2 text-md  gap-3"
      )}
    >
      <div className="flex items-center justify-start w-full gap-5 ">
        <Avatar
          src={avatar}
          size={{ base: "md", lg: "lg" }}
          onClick={() => router.push(`/account/${id}`)}
          className="cursor-pointer"
        />
        <div className="flex flex-col ">
          <p
            className="text-lg font-bold"
            onClick={() => router.push(`/account/${id}`)}
          >
            {username}
          </p>
          <p className="text-gray-500 text-md">{agent} </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-3 font-semibold">
        <button
          onClick={() => router.push(`tel:${phone}`)}
          className={mergeNames(
            STYLES.flexCenter,
            "relative z-10",
            "items-center gap-1 bg-white text-blue-600 p-2 rounded-md hover:bg-blue-600 hover:text-white transition-all ease-in-out border border-blue-600"
          )}
        >
          <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
        </button>
        <button
          onClick={() => router.push(`mailto:${email}`)}
          className={mergeNames(
            STYLES.flexCenter,
            "relative z-10",
            "items-center gap-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900 hover:text-white transition-all ease-in-out border border-blue-600 hover:border-blue-900"
          )}
        >
          {/* <RiMailOpenFill />: */}
          <p className="whitespace-nowrap"> Имэйл илгээх</p>
        </button>
      </div>
    </div>
  );
};

export const SmallUserInfo = ({
  phone,
  username,
  agent,
  avatar,
  email,
  id,
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-3 mx-0 ">
      <div className="flex items-center gap-3">
        <Avatar
          src={
            avatar ??
            "https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png"
          }
          size={{ base: "xs", lg: "sm" }}
          className="cursor-pointer"
          onClick={() => router.push(`/account/${id}`)}
        />

        <div>
          <h4
            className="font-bold cursor-pointer"
            onClick={() => router.push(`/account/${id}`)}
          >
            {username}
          </h4>
          <h6 className="text-sm">{agent}</h6>
        </div>
      </div>

      <div className="flex w-full gap-3 font-semibold">
        <button
          onClick={() => router.push(`tel:${phone}`)}
          className={mergeNames(
            STYLES.flexCenter,
            "relative z-10",
            "items-center gap-1 bg-white text-blue-600 p-2 rounded-md hover:bg-blue-600 hover:text-white transition-all ease-in-out border border-blue-600"
          )}
        >
          <FaPhoneAlt />:<p className="whitespace-nowrap"> {phone}</p>
        </button>
        <button
          onClick={() => router.push(`mailto:${email}`)}
          className={mergeNames(
            STYLES.flexCenter,
            "relative z-10 aspect-square w-10",
            "items-center gap-1 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-900 hover:text-white transition-all ease-in-out border border-blue-600 hover:border-blue-900"
          )}
        >
          <AiFillMail />
        </button>
      </div>
    </div>
  );
};

export const SmallProductHeader = ({ price, unitPrice }) => {
  return (
    <>
      <div className="text-right">
        <p className="font-semibold text-md sm:text-xl text-mainBlue">
          {currency(`${price}`, {
            separator: ",",
            symbol: "₮ ",
            pattern: `# !`,
          })
            .format()
            .toString() ?? 0}
        </p>

        {/* Hervee turees baival ene heregguin bn */}
        <p className="text-sm font-semibold sm:text-lg">
          {currency(`${unitPrice}`, {
            separator: ",",
            symbol: "₮/м.кв",
            pattern: `# !`,
          })
            .format()
            .toString() ?? 0}
        </p>
      </div>
    </>
  );
};

export default UserInfo;
