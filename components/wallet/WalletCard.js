import { Image } from "@chakra-ui/react";
import { capitalizeFirst } from "../Profile/socials";

const WalletCard = ({ user }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="font-bold w-full  h-[250px] bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-5 flex flex-col justify-between mx-auto text-white">
          <div className="flex justify-between">
            <h1 className="text-xl">E-unit хэтэвч</h1>
            <Image
              alt="bom logo"
              src="/images/logo/bom-white.png"
              className="w-[30px]"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white/80">Нэр</h1>
            <h1 className="">{capitalizeFirst(user?.username)}</h1>
          </div>
          <div>
            <h1 className="text-white/80">Үлдэгдэл</h1>
            <h1 className="text-xl">{user?.point ?? 0} E-unit</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletCard;
