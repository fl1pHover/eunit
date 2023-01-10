import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

//TODO Container
import MainContainer from '../layout/mainContainer';

//TODO Icons
import { BsSearch } from 'react-icons/bs';
import { categories } from '../data/categories';

const NavItem = ({ text, icon, href }) => {
  return (
    <Link href={href}>
      <Stack
        alignItems={'center'}
        className="nav__item"
        py={3}
        px={3}
        borderRadius="20px"
      >
        {icon}
        <Text marginTop={'3px !important'} textStyle={''} lineHeight={1}>
          {text}
        </Text>
      </Stack>
    </Link>
  );
};

const DownLink = ({ href, text, children }) => {
  return (
    <Link
      href={href}
      width="100%"
      _hover={{
        color: 'mainBlossom',
      }}
    >
      {children && children}
      {text != '' && <Text>{text}</Text>}
    </Link>
  );
};

const Navbar = ({ user, logout }) => {
  const [sticky, setSticky] = useState(false);
  const [active, setActive] = useState(false);

  const handleClick = (event) => {
    setActive((current) => !current);
  };

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
      // else !setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Box
        as="header"
        width={'100%'}
        bgColor="mainBlue"
        transition={'0.3s ease'}
        px={3}
        color="white"
      >
        <MainContainer>
          <HStack justifyContent={'space-between'}>
            <Text>Welcome to BOM Website</Text>
            <Text>Холбоо барих: 9999-9999</Text>
          </HStack>
        </MainContainer>
      </Box>
      <Box
        id="navbar"
        as={'section'}
        pos={sticky ? 'sticky' : 'relative'}
        top="0"
        zIndex={'20'}
      >
        <Box
          bgColor={'white'}
          boxShadow="md"
          as={'article'}
          px={'-100px'}
          position="sticky"
          zIndex={'20'}
        >
          <MainContainer>
            <Stack
              direction={'row'}
              py={2}
              width={'full'}
              alignItems="center"
              justifyContent={'space-between'}
            >
              <Link href="/">
                <Image
                  src="/images/logo/bom_word.png"
                  alt="BOM logo"
                  // height={"75px"}
                  width={'100%'}
                  maxHeight="75px"
                  objectFit="contain"
                />
              </Link>

              <Flex
                width={'100%'}
                mx={'50px !important'}
                ml={{ xl: '150px !important' }}
              >
                <InputGroup height={'40px'} width="100%">
                  <Input
                    placeholder="Хайх.."
                    borderColor={'#d9dedc'}
                    bgColor={'bgGrey'}
                    borderRadius={'10px'}
                    focusBorderColor={'mainBlossom'}
                    height={'100%'}
                    _hover={{
                      background: 'white',
                    }}
                  />
                  <InputRightElement
                    height={'100%'}
                    bgColor="mainBlossom"
                    borderRightRadius="10px"
                  >
                    <Button
                      size={'xl'}
                      width={'full'}
                      height={'full'}
                      fontSize={'20px'}
                      background={'none'}
                      _hover={{
                        opacity: '0.8',
                      }}
                    >
                      <BsSearch className="white__icon" />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </Flex>

              {/* NAVBAR RIGHT */}
              <Flex float={'right'}>
                <Flex
                  height={'full'}
                  alignItems={'center'}
                  px={10}
                  py={1}
                  gap={5}
                  // className="navbar__item"
                >
                  <Link href="/wallet">
                    <VStack className="animated__wallet">
                      <Flex gap={1}>
                        <Box
                          width={'25px'}
                          height="25px"
                          className="animated__icon"
                        />
                        <Box lineHeight={'1'}>
                          <Text>Хэтэвч</Text>
                          <Text>0,000₮</Text>
                        </Box>
                      </Flex>
                    </VStack>
                  </Link>
                  <Link href="/estimate">
                    <VStack className="animated__estimator">
                      <Box
                        width={'25px'}
                        height="25px"
                        className="animated__icon"
                      />
                      <Text mt="0 !important">Үнэлгээ</Text>
                    </VStack>
                  </Link>
                  <Link href="/bookmark">
                    <VStack className="animated__heart">
                      <Box
                        width={'25px'}
                        height="25px"
                        className="animated__icon"
                      />
                      <Text mt="0 !important">Хүсэл</Text>
                    </VStack>
                  </Link>
                  {user.status == false && (
                    <Link href="/login">
                      <VStack className="animated__account">
                        <Box
                          width={'25px'}
                          height="25px"
                          className="animated__icon"
                        />
                        <Text mt="0 !important">Бүртгүүлэх</Text>
                      </VStack>
                    </Link>
                  )}

                  {user.status == true && (
                    <VStack
                      // className="animated__account"
                      className="animated__account"
                      textAlign={'center'}
                      onClick={handleClick}
                      pos="relative"
                    >
                      <Box
                        width={'25px'}
                        height="25px"
                        className="animated__icon"
                      />
                      <Text mt="0 !important">Профайл</Text>
                      <Box
                        className={
                          active
                            ? 'profile__drop-menu'
                            : 'profile__drop-menu drop__hidden'
                        }
                        pos="absolute"
                        bottom="-200px"
                        right="0"
                        onClick={handleClick}
                        boxShadow="lg"
                        height="200px"
                        width="250px"
                        bgColor="white"
                        rounded={5}
                        p={3}
                        zIndex="21"
                      >
                        <HStack alignItems={'center'}>
                          {/* <Avatar src={user.profileImg} size={"sm"} /> */}
                          <VStack alignItems={'center'}>
                            <Avatar
                              src="https://bit.ly/dan-abramov"
                              size={'sm'}
                            />
                            <VStack alignItems={'flex-start'}>
                              <Text>{user.username}</Text>
                              <Text mt={'0 !important'}>{user.email}</Text>
                            </VStack>
                          </VStack>
                        </HStack>
                        <Divider
                          orientation="horizontal"
                          bgColor={'red'}
                          my={3}
                        />
                        <VStack textAlign="left" color={'grey'}>
                          <DownLink
                            href={'/account?profile'}
                            text="Хувийн мэдэээлэл"
                          />
                          <DownLink href={'/account?ads'} text="Миний зарууд" />

                          <DownLink href={'/account?wallet'} text="Хэтэвч" />
                          <Divider
                            orientation="horizontal"
                            bgColor={'red'}
                            my={3}
                          />
                          <DownLink>
                            <Button
                              width="100%"
                              h={'auto'}
                              _hover={{
                                color: 'mainBlossom',
                              }}
                              variant={'unstyled'}
                              onClick={() => logout()}
                            >
                              Гарах
                            </Button>
                          </DownLink>
                        </VStack>
                      </Box>
                    </VStack>
                  )}
                </Flex>
              </Flex>
            </Stack>
          </MainContainer>
        </Box>
        <Box
          bgColor={'mainBlossom'}
          as="article"
          id="nav__category"
          className={sticky ? 'wrap' : 'unwrap'}
          position="sticky"
          zIndex={'19'}
          display="none"
        >
          <MainContainer>
            <Stack
              direction={'row'}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              py={1}
            >
              <Stack
                direction={'row'}
                borderColor="mainBlossom"
                borderWidth={1}
              >
                {categories.map(({ ...props }, index) => {
                  console.log(props);
                  return (
                    <Box
                      key={index}
                      py={3}
                      px={4}
                      color="white"
                      _hover={{
                        bgColor: 'white',
                        color: 'mainBlossom',
                      }}
                      className="nav__category"
                    >
                      <Link color={'inherit'} href={`/category/${props.id}`}>
                        {props.categoryName}
                      </Link>
                      <Stack
                        direction={'column'}
                        className="nav__sub"
                        position="absolute"
                        whiteSpace="nowrap"
                        p={1}
                        roundedBottom={6}
                      >
                        {props.submenu &&
                          props.submenu.map((sub, i) => {
                            console.log(props);
                            return (
                              <Link
                                key={i}
                                href={`/category/${props.id}/${sub.href}`}
                                p={2}
                              >
                                {sub.category}
                              </Link>
                            );
                          })}
                      </Stack>
                    </Box>
                  );
                })}
              </Stack>
              <Stack direction={'row'}>
                <Link href={'/project'}>
                  <Button variant={'whiteButton'} disabled>
                    Шинэ төсөл
                  </Button>
                </Link>

                <Link href={'/createAd'}>
                  <Button variant={'blueButton'}>Зар нэмэх</Button>
                </Link>
              </Stack>
            </Stack>
          </MainContainer>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
