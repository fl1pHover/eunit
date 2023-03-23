import { ContainerXP } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Box, FormControl, FormLabel, Image, Input } from '@chakra-ui/react';
import { useRouter } from 'next/router';

const ForgetPassword = () => {
  const router = useRouter();

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
          <form>
            <ForgetInput lbl="Шинэ нууц үг" />
            <Box h={5} />
            <ForgetInput lbl="Шинэ нууц үг давтах" />
            <Box h={7} />
            <button
              className={mergeNames('w-full h-auto py-3', STYLES.blueButton)}
            >
              Шинэчлэх
            </button>
          </form>
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

export const ForgetInput = ({ lbl }) => {
  return (
    <Box bg={'bg.input'} borderRadius={12} w="full">
      <FormControl variant={'floating'} id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9 "
          className={mergeNames('relative text-[14px] rounded-full')}
          // type={type === 'password' ? (!show ? 'password' : 'text') : type}

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
