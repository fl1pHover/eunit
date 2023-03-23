import urls from '@/constants/api';
import { ContainerXP } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import {
  Box,
  FormControl,
  FormLabel,
  Image,
  Input,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

import { useRouter } from 'next/router';
import { useState } from 'react';

const ForgetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState();
  const [vPassword, setVPassword] = useState();
  const toast = useToast();
  return (
    <ContainerXP
      classname={mergeNames(
        'w-[auto] md:w-[800px] lg:w-[1000px] ',
        'relative grid grid-cols-1 md:grid-cols-2',
        'mx-auto my-5 md:my-10 rounded-xl overflow-hidden'
      )}
    >
      <div className="relative hidden bg-blue-900 md:block">
        <Image
          src="/images/city1.jpg"
          alt="login page side image"
          className="object-cover h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-blue-900/60" />
      </div>
      <div className="z-10 flex justify-center shadow-md w-[90%] md:w-full mx-auto h-[650px]">
        <div className={mergeNames(STYLES.loginWidth)}>
          <Image
            src="/images/logo/bom-blue-text.png"
            alt="bom logo"
            className="w-[150px] mx-auto mb-10"
          />
          <h1 className="my-3 text-2xl font-bold text-center">
            Нууц үг сэргээх
          </h1>
          <div>
            <ForgetInput
              lbl="Шинэ нууц үг"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box h={5} />
            <ForgetInput
              lbl="Шинэ нууц үг давтах"
              onChange={(e) => setVPassword(e.target.value)}
            />
            <Box h={7} />
            <button
              className={mergeNames('w-full h-auto py-3', STYLES.blueButton)}
              onClick={async () => {
                if (
                  password.length > 6 &&
                  password == vPassword &&
                  router.query.slug
                ) {
                  try {
                    await axios
                      .post(
                        `${urls['test']}/auth/forget/${router.query.slug}`,
                        { password }
                      )
                      .then((d) => {
                        if (d.data || d.data == 'true') {
                          toast({
                            title: 'Амжилттай нууц үг солилоо',
                            duration: 5000,
                            status: 'success',
                          });
                          router.push('/login');
                        } else {
                          toast({
                            title: 'Алдаа гарлаа',
                            duration: 5000,
                            status: 'warning',
                          });
                        }
                      });
                  } catch (error) {
                    toast({
                      title: 'Алдаа гарлаа',
                      duration: 5000,
                      status: 'error',
                    });
                  }
                }
              }}
            >
              Шинэчлэх
            </button>
          </div>
          <p className="my-10 text-sm font-bold text-gray-600">
            <button
              className="text-blue-800"
              onClick={() => router.push('/login')}
            >
              Нэвтрэх хэсэг рүү буцах
            </button>
          </p>
        </div>
      </div>
    </ContainerXP>
  );
};

export const ForgetInput = ({ lbl, onChange }) => {
  return (
    <Box bg={'bg.input'} borderRadius={12} w="full">
      <FormControl variant={'floating'} id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9 "
          className={mergeNames('relative text-[14px] rounded-full')}
          // type={type === 'password' ? (!show ? 'password' : 'text') : type}
          onChange={onChange}
          required
        />
        <FormLabel className={mergeNames('text-[14px] md:text-base ')}>
          {lbl}
        </FormLabel>

        {/* Show password */}
        {/* {type === 'password' && (
        <div
          onClick={handleClick}
          className="absolute top-[50%] -translate-y-[50%] right-0 w-[40px] h-[40px] z-10 grid place-items-center cursor-pointer"
        >
          {show ? <BiHide /> : <BiShow />}
        </div>
      )} */}
      </FormControl>
    </Box>
  );
};

export default ForgetPassword;
