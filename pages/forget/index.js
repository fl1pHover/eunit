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

const Forget = () => {
  const router = useRouter();
  const [email, setEmail] = useState();
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
            <p className="text-sm font-semibold">
              Имэйл рүү тань нууц үг шинэчлэх линк очих болно
            </p>
            <Box h={4} />
            <ForgetInput
              lbl="Имэйл хаяг"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box h={7} />
            <button
              className={mergeNames('w-full h-auto py-3', STYLES.blueButton)}
              onClick={async () => {
                if (email != '') {
                  try {
                    await axios
                      .get(`${urls['test']}/auth/forget?email=${email}`)
                      .then((d) => {
                        console.log(d.data);
                        if (d.data == 'true' || d.data) {
                          toast({
                            title:
                              'Имэйл рүү тань нууц үг шинэчлэх линк явууллаа',
                            status: 'success',
                            duration: 5000,
                          });
                        } else {
                          toast({
                            title: 'Имэйлээ шалгана уу',
                            status: 'warning',
                            duration: 5000,
                          });
                        }
                      });
                  } catch (error) {
                    if (error.response.data.message == 'user not found') {
                      toast({
                        title: 'Бүртгэлгүй имэйл байна',
                        status: 'warning',
                        duration: 5000,
                      });
                    } else {
                      toast({
                        title: 'Алдаа гарлаа',
                        status: 'error',
                        duration: 5000,
                      });
                    }
                  }
                }
              }}
            >
              Илгээх
            </button>
          </div>
          <p className="my-10 text-sm font-bold text-center text-gray-600">
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
          type={'email'}
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

export default Forget;
