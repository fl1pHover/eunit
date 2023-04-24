import urls from '@/constants/api';
import { ContainerX } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Heading, Select, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminWallet = ({ user }) => {
  const [point, setPoint] = useState({
    email: '',
    point: '',
    message: '',
    type: 'default',
  });
  const toast = useToast();
  const token = getCookie('token');
  const router = useRouter();
  const sendPoint = async () => {
    try {
      if (token && point.email && point.point) {
        await axios
          .get(
            `${
              urls['test']
            }/user/point/${point.email.toLowerCase()}/${parseFloat(
              point.point
            )}/${point.type}/{message}?message=${point.message}`,
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
            if (d.data.message == 'not found receiver') {
              toast({
                title: 'Хүлээн авагч олдсонгүй',
                status: 'warning',
                duration: 1000,
                isClosable: true,
              });
            }
            if (d.data.message == 'not enough points') {
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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerX classname="min-h-[80vh]">
      <div
        className={mergeNames('grid xl:grid-cols-2 grid-cols-1 gap-10 mt-5')}
      >
        {/* Card */}
        <div className="flex flex-col">
          <div className="font-bold w-[400px] h-[250px] bg-gradient-to-r from-cyan-600 to-blue-700 rounded-lg p-5 flex flex-col justify-between mx-auto text-white">
            <div className="flex justify-between">
              <h1 className="">BOM хэтэвч</h1>
              <Image
                alt="bom logo"
                src="/images/logo/bom-white.png"
                className="w-[30px]"
                width={'30px'}
                height={'30px'}
              />
            </div>
            <h1 className="">Нэр</h1>
            <div>
              <h1 className="text-white/80">Үлдэгдэл</h1>
              <h1 className="text-xl">{user?.point ?? 0} ₮</h1>
            </div>
          </div>
          <div className="grid flex-col grid-cols-2 gap-2 mx-auto mt-5">
            <input
              placeholder="Шилжүүлэх хүний и-мэйл"
              className={mergeNames(STYLES.input)}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <input
              placeholder="Дүн"
              className={mergeNames(STYLES.input)}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, point: e.target.value }));
              }}
            />
            <Select
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, type: e.target.value }));
              }}
            >
              <option value="default">Энгийн</option>
              <option value="bonus">Урамшуулал</option>
            </Select>
            <textarea
              placeholder="Мэссэж"
              maxLength={100}
              className={mergeNames(STYLES.input, 'rounded-md col-span-full')}
              onChange={(e) => {
                setPoint((prev) => ({ ...prev, message: e.target.value }));
              }}
            />
            <button
              className={mergeNames(STYLES.blueButton, 'col-span-full p-2')}
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
              <button className="mx-5 font-semibold text-gray-500">
                Илгээгч
              </button>
              <button className="mx-5 font-semibold text-gray-500">
                Хүлээн авагч
              </button>
              <p className="font-bold text-blue-700">Eunit</p>
            </div>
          </div>
          {user?.pointHistory?.map((ph, i) => {
            return (
              <div className="flex flex-col w-full gap-3 mt-4" key={i}>
                <div className="grid w-full grid-cols-3">
                  <button className="mx-5 font-semibold text-left text-gray-500">
                    {ph.sender?.username}
                  </button>
                  <button className="mx-5 font-semibold text-gray-500">
                    {ph.receiver?.username}
                  </button>
                  <p className="font-bold text-right text-blue-700">
                    {ph.type == 'sender' ? '-' : '+'}
                    {ph.point}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ContainerX>
  );
};
export default AdminWallet;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls['test']}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await
      if (user?.userType == 'admin' || user?.userType == 'system') {
        return {
          props: {
            user,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
