import { STYLES } from '@/styles/index';
import CustomToast from '@/util/customToast';
import mergeNames from '@/util/mergeNames';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import { useAuth } from 'context/auth';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import MainContainer from '../../layout/mainContainer';

export default function Login() {
  const { logout, login, signup } = useAuth();
  const [signupCredential, setSignupcredential] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const router = useRouter();
  const [credential, setCredential] = useState({ email: '', password: '' });
  const signUp = () => {
    if (
      signupCredential.password == signupCredential.confirmPassword &&
      signupCredential.email != '' &&
      setSignupcredential.password != ''
    ) {
      signup(
        signupCredential.email,
        signupCredential.password,
        signupCredential.username,
        signupCredential.phone
      );
    }
  };

  const signIn = () => {
    if (credential.email && credential.password) {
      login(credential.email, credential.password);
      setCredential((credential) => ({
        ...credential,
        email: '',
        password: '',
      }));
    }
  };
  return (
    <MainContainer w={'450px'} className="asd">
      {/* <div className="relative grid  grid-cols-1 md:my-10 my-5 lg:grid-cols-2 h-[65vh]">
        <div>
          <Image
            src="/images/login.png"
            alt="login page side image"
            className="absolute left-0 object-contain h-full opacity-80"
          />
        </div>
        <div className="z-10 flex justify-center">
          <div
            className={mergeNames(
              STYLES.flexCenter,
              'flex-row bg-white px-3 md:px-[50px] py-[30px] w-[500px] rounded-xl items-center'
            )}
          >
            <Tabs w="full">
              <TabList className="w-[80%] gap-4 mx-auto border-none justify-center">
                <Tab fontSize={'18px'} fontWeight={600}>
                  Нэвтрэх
                </Tab>
                <Tab fontSize={'18px'} fontWeight={600}>
                  Бүртгүүлэх
                </Tab>
              </TabList>
              <TabPanels w={'full'} className="h-[450px]">
                <TabPanel>
                  <LoginComp
                    credential={credential}
                    setCredential={setCredential}
                    fc={signIn}
                  />
                </TabPanel>
                <TabPanel>
                  <SignUpComp
                    credential={signupCredential}
                    setCredential={setSignupcredential}
                    fc={signUp}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div> */}
      <div className="relative grid grid-cols-1 md:my-10 my-5 lg:grid-cols-2 h-[65vh]">
        <div className="bg-blue-500"></div>
        <div className="z-10 flex justify-center">
          <div
            className={mergeNames(
              STYLES.flexCenter,
              'flex-row bg-white px-3 md:px-[50px] py-[30px] w-[500px] rounded-xl items-center'
            )}
          >
            <Tabs w="full">
              <TabList className="justify-center w-full gap-4 mx-auto border-none">
                <Tab fontSize={'18px'} fontWeight={600}>
                  Нэвтрэх
                </Tab>
                <Tab fontSize={'18px'} fontWeight={600}>
                  Бүртгүүлэх
                </Tab>
              </TabList>
              <TabPanels w={'full'} className="h-[450px]">
                <TabPanel>
                  <LoginComp
                    credential={credential}
                    setCredential={setCredential}
                    fc={signIn}
                  />
                </TabPanel>
                <TabPanel>
                  <SignUpComp
                    credential={signupCredential}
                    setCredential={setSignupcredential}
                    fc={signUp}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

export const LoginComp = ({ credential, setCredential, fc }) => {
  return (
    <FormControl>
      <Box h={3} />
      <InputComp
        lbl={'Та И-Мэйл хаягаа оруулна уу'}
        type="email"
        setValue={setCredential}
        value={credential.email}
        v={'email'}
      />
      <Box h={4} />
      <InputComp
        lbl={'Та нууц үгээ оруулна уу'}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />
      <Box h={10}></Box>
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="Нэвтрэх"
        stats="success"
        toastH="Амжилттай нэвтэрлээ"
      /> */}
      <button
        className="w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        onClick={() => {
          fc(), (<CustomToast />);
        }}
      >
        Нэвтрэх
      </button>
    </FormControl>
  );
};

export const SignUpComp = ({ credential, setCredential, fc }) => {
  return (
    <FormControl>
      <Box h={3} />

      <InputComp
        lbl={'Та И-Мэйл хаягаа оруулна уу'}
        type="email"
        value={credential.email}
        setValue={setCredential}
        v="email"
      />
      <Box h={4} />
      <InputComp
        lbl={'Та утасны дугаараа оруулна уу'}
        type="tel"
        value={credential.phone}
        setValue={setCredential}
        v="phone"
      />
      <Box h={4} />
      <InputComp
        lbl={'Та нэрээ оруулна уу'}
        type="text"
        value={credential.username}
        setValue={setCredential}
        v="username"
      />
      <Box h={4} />
      <InputComp
        lbl={'Та нууц үгээ оруулна уу'}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />
      <Box h={4} />
      <InputComp
        lbl={'Та нууц үгээ дахин оруулна уу'}
        type="password"
        value={credential.confirmPassword}
        setValue={setCredential}
        v="confirmPassword"
      />

      <Box h={10} />
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="Бүртүүлэх"
        stats="success"
        toastH="Амжилттай бүртгэгдлээ"
      /> */}
      <button
        className="w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        onClick={() => {
          fc(), (<CustomToast />);
        }}
      >
        Нэвтрэх
      </button>
    </FormControl>
  );
};

export const InputComp = ({ lbl, type, value, setValue, v }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box bg={'bg.input'} borderRadius={12} w="full">
      <FormControl variant="floating" id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9"
          //   _focusVisible={{ border: "none" }}
          className="relative text-[14px]"
          type={type === 'password' ? (!show ? 'password' : 'text') : 'text'}
          value={value}
          onChange={(e) => {
            switch (v) {
              case 'email':
                setValue((value) => ({
                  ...value,
                  email: e.target.value,
                }));
                break;
              case 'phone':
                setValue((value) => ({
                  ...value,
                  phone: e.target.value,
                }));
                break;
              case 'password':
                setValue((value) => ({
                  ...value,
                  password: e.target.value,
                }));
                break;
              case 'confirmPassword':
                setValue((value) => ({
                  ...value,
                  confirmPassword: e.target.value,
                }));
                break;
              case 'username':
                setValue((value) => ({
                  ...value,
                  username: e.target.value,
                }));
                break;
              default:
                break;
            }
          }}
        />
        {type === 'password' && (
          <button
            onClick={handleClick}
            className="absolute top-[50%] -translate-y-[50%] right-0 w-[40px] h-[40px] z-10 grid place-items-center "
          >
            {show ? <BiHide /> : <BiShow />}
          </button>
        )}
        <FormLabel className="text-[14px] md:text-base">{lbl}</FormLabel>
      </FormControl>
    </Box>
  );
};
