import {
     Box,
     Button,
     Divider,
     FormControl,
     FormLabel,
     Grid,
     GridItem,
     HStack,
     Image,
     Input,
     Tab,
     TabList,
     TabPanel,
     TabPanels,
     Tabs,
     Text,
     VStack,
} from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "context/auth";
import { initializeApp } from "firebase/app";

import {
     createUserWithEmailAndPassword,
     getAuth,
     GoogleAuthProvider,
     signInWithEmailAndPassword,
     signInWithPopup,
} from "firebase/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useState } from "react";
import MainContainer from "../../layout/mainContainer";



export default function Login() {
     const {logout, login} = useAuth()
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
              
          }
     };
     // const signByGoogle = () => {
     //      const provider = new GoogleAuthProvider();
     //      const auth = getAuth();
     //      signInWithPopup(auth, provider).then(async (res) => {
     //           const cre = GoogleAuthProvider.credentialFromResult(res);
     //           const user = res.user;
     //           if (user) {
     //                console.log(user);
     //                try {
     //                     await axios.post(
     //                          "https://bom-location.herokuapp.com/user",
     //                          {
     //                               username: user.displayName,
     //                               email: user.email,
     //                               profileImg: user.profileImg,
     //                               phone: "99999999",
     //                          }
     //                     );
     //                } catch (err) {
     //                     console.log(err);
     //                }
     //                router.push("/");
     //           }
     //      });
     // };

     const signIn = () => {
          if(credential.email && credential.password) {
               login(credential.email, credential.password)
          setCredential((credential) => ({...credential, email: '', password: ''}))
          }
     };
     return (
          <MainContainer w={"450px"} className="asd">
               <Grid
                    templateColumns={{
                         base: "repeat(1,1fr)",
                         lg: "repeat(2,1fr)",
                    }}
                    my={10}
                    position={"relative"}
                    height="65vh"
               >
                    <GridItem>
                         <Image
                              src="/images/login.png"
                              alt="login page side image"
                              position="absolute"
                              left={"0"}
                              height={"100%"}
                              objectFit="contain"
                              opacity={"80%"}
                         />
                    </GridItem>
                    <GridItem
                         zIndex={"1"}
                         display="flex"
                         justifyContent={"center"}
                    >
                         <VStack
                              px={"50px"}
                              py={"30px"}
                              bg="white"
                              width="500px"
                              borderRadius={"20px"}
                              justifyContent="center"
                         >
                              <Tabs w="full">
                                   <TabList
                                        w={"80%"}
                                        gap={4}
                                        mx="auto"
                                        border={"none"}
                                        justifyContent="center"
                                   >
                                        <Tab fontSize={"18px"} fontWeight={600}>
                                             Нэвтрэх
                                        </Tab>
                                        <Tab fontSize={"18px"} fontWeight={600}>
                                             Бүртгүүлэх
                                        </Tab>
                                   </TabList>
                                   <TabPanels w={"full"}>
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
                                                  setCredential={
                                                       setSignupcredential
                                                  }
                                                  fc={signUp}
                                             />
                                        </TabPanel>
                                   </TabPanels>
                              </Tabs>
                         </VStack>
                    </GridItem>
               </Grid>
          </MainContainer>
     );
}

export const LoginComp = ({ credential, setCredential, fc,  }) => {
     return (
          <FormControl>
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
               <Box h={10} />
               <Button
                    w={"full"}
                    borderRadius={"5px"}
                    h={"auto"}
                    py={4}
                    onClick={() => fc()}
               >
                    Нэвтрэх
               </Button>
          </FormControl>
     );
};

export const SignUpComp = ({ credential, setCredential, fc }) => {
     return (
          <FormControl>
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
                    lbl={"Та нэрээ оруулна уу"}
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
               <Box h={10} />
               <Button
                    w={"full"}
                    borderRadius={"5px"}
                    h={"auto"}
                    py={4}
                    onClick={() => fc()}
               >
                    Нэвтрэх
               </Button>
          </FormControl>
     );
};

export const InputComp = ({ lbl, type, value, setValue, v }) => {
     return (
          <Box bg={"bg.input"} borderRadius={12} w="full">
               <FormControl variant="floating" id="first-name" isRequired>
                    <Input
                         placeholder=" "
                         border="1px solid #d9d9d9"
                         //   _focusVisible={{ border: "none" }}
                         fontSize={14}
                         type={type}
                         value={value}
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
                    <FormLabel>{lbl}</FormLabel>
               </FormControl>
          </Box>
     );
};
