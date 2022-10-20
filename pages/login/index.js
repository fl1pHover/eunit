import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
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
import { SiGmail } from "react-icons/si";
export default function Login() {
  return (
    <Container w={'450px'} my={10}>
      <VStack
        px={"50px"}
        py={"30px"}
        bg="white"
        borderRadius={"20px"}
        justifyContent="center"
      >
        <Tabs w='full'>
          <TabList w={'80%'} gap={4} mx='auto' border={'none'} justifyContent='center'>
            <Tab fontSize={'18px'} fontWeight={600}>Нэвтрэх</Tab>
            <Tab fontSize={'18px'} fontWeight={600}>Бүртгүүлэх</Tab>
          </TabList>
          <TabPanels w={'full'}>
            <TabPanel>
              <LoginComp />
            </TabPanel>
            <TabPanel>
              <SignUpComp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
}

export const LoginComp = () => {
  return (
    <FormControl>
        <Box h={3}/>
      <Button
        bg="#4285F4"
        color={"white"}
        p={"12px"}
        borderRadius={"5px"}
        height="auto"
        w={'full'}
      >
        <HStack>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            height={"20px"}
          />
          <Text fontSize={'16px'}>Gmail - ээр нэвтрэх</Text>
        </HStack>
      </Button>
      <Box pos={"relative"} my={10} w='70%' mx={'auto'}>
        <Divider />
        <Text
          pos={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          bg='white'
          p={4}
        >
          эсвэл
        </Text>
      </Box>
      <InputComp lbl={"Та И-Мэйл хаягаа оруулна уу"} type='email'/>
      <Box h={4}/>
      <InputComp lbl={"Та нууц үгээ оруулна уу"} type='password'/>
      <Box h={10}/>
      <Button w={'full'} borderRadius={'5px'} h={'auto'} py={4}>Нэвтрэх</Button>
    </FormControl>
  );
};

export const SignUpComp = () => {
    return (
        <FormControl>
        <Box h={3}/>
      <Button
        bg="#4285F4"
        color={"white"}
        p={"12px"}
        borderRadius={"5px"}
        height="auto"
        w={'full'}
      >
        <HStack>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
            height={"20px"}
          />
          <Text fontSize={'16px'}>Gmail - ээр нэвтрэх</Text>
        </HStack>
      </Button>
      <Box pos={"relative"} my={10} w='70%' mx={'auto'}>
        <Divider />
        <Text
          pos={"absolute"}
          top={"50%"}
          left={"50%"}
          transform={"translate(-50%, -50%)"}
          bg='white'
          p={4}
        >
          эсвэл
        </Text>
      </Box>
      <InputComp lbl={"Та И-Мэйл хаягаа оруулна уу"} type='email'/>
      <Box h={4}/>
      <InputComp lbl={"Та утасны дугаараа оруулна уу"} type='email'/>
      <Box h={4}/>
      <InputComp lbl={"Та нууц үгээ оруулна уу"} type='password'/>
      <Box h={4}/>
      <InputComp lbl={"Та нууц үгээ дахин оруулна уу"} type='password'/>
      <Box h={10}/>
      <Button w={'full'} borderRadius={'5px'} h={'auto'} py={4}>Нэвтрэх</Button>
    </FormControl>
    )
}

export const InputComp = ({ lbl, type }) => {
  return (
    <Box bg={"bg.input"} borderRadius={12}  w="full">
      <FormControl variant="floating" id="first-name" isRequired>
        <Input
          placeholder=" "
          border="1px solid #d9d9d9"
        //   _focusVisible={{ border: "none" }}
          fontSize={14}
          type={type}
        />
        <FormLabel >{lbl}</FormLabel>
      </FormControl>
    </Box>
  );
};
