import urls from '@/constants/api';
import mergeNames from '@/util/mergeNames';
import { Box, Heading, Image, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { STYLES } from '../styles';

const WalletPage = ({ user }) => {
  const [point, setPoint] = useState({
    email: '',
    point: '',
  });
  const toast = useToast();
  const token = getCookie('token');
  const router = useRouter();
  const sendPoint = async () => {
    try {
      if (token && point.email && point.point) {
        await axios
          .get(
            `${urls['test']}/user/point/${point.email}/${parseFloat(
              point.point
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Access-Control-Allow-Headers': '*',
              },
            }
          )
          .then((d) => {
            if (d.data.message == 'success') {
              toast({
                title: 'Амжилттай илгээлээ.',
                status: 'success',
                duration: 1000,
                isClosable: true,
              });
            }
            if (d.data.status == 400) {
              toast({
                title: 'Үлдэгдэл хүрэлцэхгүй байна',
                status: 'warning',
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
    <div className={mergeNames('grid xl:grid-cols-2 grid-cols-1 gap-10 mt-5')}>
      {/* Card */}
      <div className="flex flex-col">
        <div className="font-bold w-[400px] h-[250px] bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-5 flex flex-col justify-between mx-auto text-white">
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
        <div className="mt-5">
          <input
            placeholder="Шилжүүлэх хүний и-мэйл"
            className={mergeNames(STYLES.input)}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <Box h={4} />
          <input
            placeholder="Дүн"
            className={mergeNames(STYLES.input)}
            onChange={(e) => {
              setPoint((prev) => ({ ...prev, point: e.target.value }));
            }}
          />
          <Box h={4} />
          <button
            className={mergeNames(STYLES.blueButton, 'p-2')}
            onClick={() => sendPoint()}
          >
            Шилжүүлэх
          </button>
        </div>
      </div>
      <div className="">
        <Heading variant="mediumHeading">Гүйлгээний түүх</Heading>
        <div className="flex flex-col w-full gap-3 mt-4">
          <div className="flex justify-between w-full">
            <p className="font-bold">Огноо</p>
            <button className="mx-5 font-semibold text-gray-500">
              Шилжүүлсэн хүний нэр
            </button>
            <p className="font-bold text-blue-700">Хэмжээ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;
