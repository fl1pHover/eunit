import { Box, Center, Divider, Heading, Image } from '@chakra-ui/react';
import { RxLayers } from 'react-icons/rx';
import { STYLES } from '../styles';

const compareTitle = [
  {
    title: 'Талбай',
  },
  {
    title: 'Нэгж талбайн үнэ',
  },
  {
    title: 'Дүүрэг',
  },
  {
    title: 'Хороо',
  },
  {
    title: 'Хотхон',
  },
  {
    title: 'Ашиглалтад орсон он',
  },
  {
    title: 'Барилгын давхар',
  },
  {
    title: 'Хэдэн давхар',
  },
  {
    title: 'Өрөө',
  },
  {
    title: 'Угаалгын өрөө',
  },
  {
    title: 'Мас/унтлагын өрөө',
  },
  {
    title: 'Цонх',
  },
  {
    title: 'Цонхны тоо',
  },
  {
    title: 'Хаалга',
  },
  {
    title: 'Шал',
  },
  {
    title: 'Гараж',
  },
  {
    title: 'Бартер',
  },
  {
    title: 'Төлбөрийн нөхцөл',
  },
];

const asd = [{ id: '1' }, { id: '2' }, { id: '3' }];

const Compare = () => {
  return (
    <Box
      as="section"
      id="compare"
      rounded={10}
      // my={3}
      mx={1}
      // md:max-w-[75%]
      className="max-w-full bg-white"
    >
      <div className="grid grid-cols-3 bg-white py-10 px-5 rounded-2xl gap-8 w-[70%] mx-auto">
        {asd.map((a, i) => {
          return (
            <Center
              className={`${STYLES.flexAround} flex-col`}
              key={i}
              id={a.id}
            >
              <Image
                src="/images/HeaderSlider/1.jpg"
                alt="comparing image 1"
                className="object-cover w-full aspect-square"
              />
              <Divider className="my-10" />{' '}
              <Heading variant="smallHeading">
                199,000,000
                <span> ₮</span>
              </Heading>
            </Center>
          );
        })}

        <Heading
          variant="mainHeading"
          className="col-span-3 pb-5 border-b border-b-bggrey"
        >
          Мэдээлэл
        </Heading>

        {asd.map((a, i) => {
          return (
            <>
              <Center key={i} id={a.id} className="flex-col">
                <RxLayers className="text-[40px]" />
                <Center className={`${STYLES.flexAround}`}>asdasd</Center>
              </Center>
              <Center key={i} id={a.id} className="flex-col">
                <RxLayers className="text-[40px]" />
                <Center className={`${STYLES.flexAround}`}>asdasd</Center>
              </Center>
              <Center key={i} id={a.id} className="flex-col">
                <RxLayers className="text-[40px]" />
                <Center className={`${STYLES.flexAround}`}>asdasd</Center>
              </Center>
              <Center key={i} id={a.id} className="flex-col">
                <RxLayers className="text-[40px]" />
                <Center className={`${STYLES.flexAround}`}>asdasd</Center>
              </Center>
              <Center key={i} id={a.id} className="flex-col">
                <RxLayers className="text-[40px]" />
                <Center className={`${STYLES.flexAround}`}>asdasd</Center>
              </Center>
            </>
          );
        })}
      </div>
    </Box>
  );
};

export default Compare;
