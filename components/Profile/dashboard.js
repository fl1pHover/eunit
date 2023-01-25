import { STYLES } from '@/styles/index';
import { Center, Flex, Image } from '@chakra-ui/react';
import { BiUser } from 'react-icons/bi';
import { BsGrid1X2 } from 'react-icons/bs';
import { FiHeart, FiLogOut } from 'react-icons/fi';

const Dashboard = () => {
  return (
    <div className="rounded-xl items-center text-[14px] bg-mainBlossom py-10 px-10 md:w-[25%] w-full border-r border-r-bgGrey h-[70vh] shadow-md">
      <div className="flex-col items-center justify-around">
        <Center flexDirection={'column'}>
          <Image
            src="https://www.w3schools.com/howto/img_avatar2.png"
            className="h-[100px] w-[100px] rounded-full object-cover"
            //   alt="profile "
          />
          <button className="py-2 mt-5 text-white font-bold bg-teal-600 rounded-[10px] px-6 ext-center p">
            Засвар хийх
          </button>
        </Center>
        <div className="flex-col items-start w-full my-8 text-[#a6c4d4]">
          <div className={`${STYLES.flexBetween}`}>
            <div>
              <p className="font-bold">Хэрэглэгч</p>
              <p className="">Энгийн</p>
            </div>
            <div>
              <p className="font-bold">Байршил</p>
              <p className="">Улаанбаатар</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 mt-8">
              <BiUser className="text-[18px]" />
              <p className="">Bishubazar lorem</p>
            </div>
            <div className="flex items-center gap-4">
              <BsGrid1X2 className="text-[18px]" />
              <p>
                <span className="font-bold text-teal-500">35</span> - Нийт зар
              </p>
            </div>
            <div className="flex items-center gap-4">
              <FiHeart className="text-[18px]" />
              <p className="">
                <span className="font-bold text-teal-500">35</span> - Нийт хүсэл
              </p>
            </div>
          </div>
        </div>
      </div>
      <button className="mt-5 py-3 w-full border-t border-t-[#a6c4d4] group ">
        <Flex className="items-center gap-3 font-bold text-white ">
          <FiLogOut className="text-[18px] group-hover:scale-110 duration-200 " />
          <p className="duration-200 group-hover:translate-x-2">Гарах</p>
        </Flex>
      </button>
    </div>
  );
};

export default Dashboard;
