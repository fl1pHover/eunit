import { ContainerXP } from "@/lib/Container";
import { STYLES } from "@/styles/index";

import mergeNames from "@/util/mergeNames";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  Link,
} from "@chakra-ui/react";
import { getCookie } from "cookies-next";

import { GoogleIcon } from "@/util/Icons";
import { signIn, signOut, useSession } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
export default function Login() {
  const { session } = useSession();
  const [signupCredential, setSignupcredential] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const router = useRouter();

  const [credential, setCredential] = useState({ email: "", password: "" });
  const signUp = () => {
    if (
      signupCredential.password == signupCredential.confirmPassword &&
      signupCredential.email != "" &&
      setSignupcredential.password != ""
    ) {
      signup(
        signupCredential.email,
        signupCredential.password,
        signupCredential.username,
        signupCredential.phone
      );
    }
  };

  const [sign, setSign] = useState(1);
  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "https://www.eunit.mn" });
  };

  // const [content, setContent] = useState("Profile");

  const tabs = [
    {
      tabHeader: "Нэвтрэх",
      title: 1,
      comp: (
        <>
          {sign == 1 && (
            <div className={mergeNames(STYLES.loginWidth)}>
              {/* <Image
                src="/images/logo/bom-blue-text.png"
                alt="bom logo"
                className="w-[150px] mx-auto mb-10"
              /> 
              <h1 className="my-3 text-2xl font-bold text-center">Нэвтрэх</h1> */}

              {session ? (
                <Button onClick={() => signOut()}>sign</Button>
              ) : (
                <GoogleSignButton onClick={() => handleGoogleSignIn()} />
              )}

              {/* <p className="my-10 text-sm font-bold text-gray-600">
                Та бүртгүүлээгүй юм биш биз?{" "}
                <button className="text-blue-800" onClick={() => setSign(2)}>
                  Бүртгүүлэх
                </button>
              </p> */}
            </div>
          )}
        </>
      ),
    },
    {
      tabHeader: "Бүртгүүлэх",
      title: 2,
      comp: (
        <>
          {sign == 2 && (
            <div className={mergeNames(STYLES.loginWidth)}>
              {session ? (
                <Button onClick={() => signOut()}>sign</Button>
              ) : (
                <GoogleSignButton onClick={() => handleGoogleSignIn()} />
              )}
              {/* <SignUpComp
                credential={signupCredential}
                setCredential={setSignupcredential}
                fc={signUp}
              />
              <p className="text-sm font-bold text-gray-600 my-7">
                Та хэдий нь бүртгэлтэй юу?{" "}
                <button className="text-blue-800" onClick={() => setSign(1)}>
                  Нэвтрэх
                </button>
              </p> */}
            </div>
          )}
        </>
      ),
    },
  ];
  return (
    <ContainerXP
      classname={mergeNames(
        "w-[auto] md:w-[800px] lg:w-[1000px] ",
        "relative grid grid-cols-1 md:grid-cols-2",
        "md:mx-auto m-5 md:my-10 rounded-xl overflow-hidden min-h-[550px]"
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

      <div
        className={mergeNames(
          "relative bg-white shadow-lg rounded-2xl w-full p-5 md:p-10",
          "transition-all duration-500"
        )}
      >
        <Image
          src="/images/logo/bom-blue-text.png"
          alt="bom logo"
          className="w-[150px] mx-auto mb-10"
        />
        <div className="flex flex-row justify-center gap-5 font-semibold cursor-pointer account-tabs">
          {tabs.map((tab, index) => {
            return (
              <button
                key={index}
                className={mergeNames(
                  "pb-3 relative text-xl ",
                  sign === tab.title ? "text-mainBlossom" : "text-gray-400"
                )}
                onClick={() => {
                  setSign(tab.title);
                  // ,router.push(
                  //   {
                  //     pathname: "/account",
                  //     query: { tab: `${tab.title}` },
                  //   },
                  //   null,
                  //   { shallow: true }
                  // );
                }}
              >
                <div
                  className={mergeNames(
                    "absolute bottom-0 left-1/2 -translate-x-1/2 bg-mainBlue h-[2px] duration-300",
                    sign === tab.title ? "w-full " : "w-0"
                  )}
                ></div>
                {tab.tabHeader}
              </button>
            );
          })}
        </div>

        {tabs.map((tab, index) => {
          return (
            tab.title && (
              <>
                <div key={index}>{sign === tab.title && tab.comp}</div>
              </>
            )
          );
        })}
      </div>
      {/* <div className="z-10 flex justify-center shadow-md w-[90%] md:w-full mx-auto h-[650px]">
        //sign 1 
        //sign 2 bsn hereg bolvol deer bga
      </div> */}
    </ContainerXP>
  );
}

export async function getServerSideProps({ req, res }) {
  // const res = await fetch(`${urls['test']}/category`);
  // const resjson = await res.json();
  const token = getCookie("token", { req, res });
  // const categories = resjson?.categories;
  if (token)
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  else {
    return {
      props: {
        route: false,
      },
    };
  }
}

export const LoginComp = ({ credential, setCredential, fc }) => {
  return (
    <form>
      <Box h={3} />

      <InputComp
        lbl={"Та И-Мэйл хаягаа оруулна уу"}
        type="email"
        setValue={setCredential}
        value={credential.email}
        v={"email"}
      />
      <Box h={4} />
      <InputComp
        lbl={"Та нууц үгээ оруулна уу"}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />

      <NextLink href={"/forget"}>
        <Link className="float-right my-4 text-sm font-bold text-blue-800">
          Нууц үг мартсан?
        </Link>
      </NextLink>
      <Box h={10}></Box>
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="Нэвтрэх"
        stats="success"
        toastH="Амжилттай нэвтэрлээ"
      /> */}

      <input
        type="submit"
        className={mergeNames(
          "w-full h-auto py-3 cursor-pointer",
          STYLES.blueButton
        )}
        onClick={() => fc()}
        value={"Нэвтрэх"}
      />
    </form>
  );
};

const MatchPass = () => {};

const GoogleSignButton = (props) => {
  return (
    <div className="flex flex-col gap-3 my-auto">
      <Button
        {...props}
        // onClick={() => handleGoogleSignIn()}
        className="gap-3 p-0 px-2 border-gray-200 rounded-lg"
      >
        <GoogleIcon size="1.2em" />
        Google хаягаар нэвтрэх
      </Button>
    </div>
  );
};

export const SignUpComp = ({ credential, setCredential, fc }) => {
  const [match, setMatch] = useState(true);

  const hm = () => {
    setMatch(credential.password == credential.confirmPassword);
  };

  return (
    <form>
      <Box h={3} />
      <InputComp
        lbl={"Та И-Мэйл хаягаа оруулна уу"}
        type="email"
        value={credential.email}
        setValue={setCredential}
        v="email"
      />
      <Box h={4} />
      <InputComp
        lbl={"Та утасны дугаараа оруулна уу"}
        type="tel"
        value={credential.phone}
        setValue={setCredential}
        v="phone"
      />
      <Box h={4} />
      <InputComp
        lbl={"Та хэрэглэгчийн нэрээ оруулна уу"}
        type="text"
        value={credential.username}
        setValue={setCredential}
        v="username"
      />
      <Box h={4} />
      <InputComp
        lbl={"Та нууц үгээ оруулна уу"}
        type="password"
        value={credential.password}
        setValue={setCredential}
        v="password"
      />
      <Box h={4} />
      <InputComp
        lbl={"Та нууц үгээ дахин оруулна уу"}
        type="password"
        value={credential.confirmPassword}
        setValue={setCredential}
        v="confirmPassword"
      />

      {!match && (
        <p className={mergeNames("text-red-500")}>Нууц үгийг адил бичнэ үү</p>
      )}

      <Box h={7} />
      {/* <CustomToast
        onclick={() => fc()}
        className="justify-center w-full h-auto py-4 font-bold text-white bg-blue-600 rounded-md"
        toastBtn="Бүртүүлэх"
        stats="success"
        toastH="Амжилттай бүртгэгдлээ"
      /> */}
      <input
        type="submit"
        className={mergeNames(
          "w-full h-auto py-3 cursor-pointer",
          STYLES.blueButton
        )}
        onClick={(e) => {
          e.preventDefault();
          fc(), hm();
        }}
        value={"Бүртгүүлэх"}
      />
    </form>
  );
};

export const InputComp = ({ lbl, type, value, setValue, v, ...props }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Box bg={"bg.input"} borderRadius={12} w="full">
      <FormControl variant={"floating"} id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9 "
          className={mergeNames(
            "relative text-[14px] rounded-full"
            // value.length == 0 ? 'border-red-500' : 'border-blue-600'
          )}
          type={type === "password" ? (!show ? "password" : "text") : type}
          value={value}
          required
          onKeyPress={props.onKeyPress}
          onChange={(e) => {
            switch (v) {
              case "email":
                setValue((value) => ({
                  ...value,
                  email: e.target.value,
                }));
                break;
              case "phone":
                setValue((value) => ({
                  ...value,
                  phone: e.target.value,
                }));
                break;
              case "password":
                setValue((value) => ({
                  ...value,
                  password: e.target.value,
                }));
                break;
              case "confirmPassword":
                setValue((value) => ({
                  ...value,
                  confirmPassword: e.target.value,
                }));
                break;
              case "username":
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
        <FormLabel className={mergeNames("text-[14px] md:text-base ")}>
          {lbl}
        </FormLabel>

        {/* Show password */}
        {type === "password" && (
          <div
            onClick={handleClick}
            className="absolute top-[50%] -translate-y-[50%] right-0 w-[40px] h-[40px] z-10 grid place-items-center cursor-pointer"
          >
            {show ? <BiHide /> : <BiShow />}
          </div>
        )}
      </FormControl>
    </Box>
  );
};
