import { Image, Link } from '@chakra-ui/react';
import MainContainer from '../layout/mainContainer';
import { styles } from '../styles';

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

const Comparing = () => {
  return (
    <MainContainer>
      <div className="flex bg-white my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
        <div className="flex flex-col">
          {/* Zariin zurag garchig */}
          <div className={`${styles.height}  w-full border-r border-r-blue`}>
            <Image
              src="/images/logo/bom-blue-text.png"
              alt="asd"
              className="object-contain h-full w-[150px] mx-auto p-5 "
            />
          </div>
          <h2 className="relative font-bold bg-[#eef0f2] p-2 z-0 flex justify-around">
            <span className="bg-[#eef0f2] absolute top-0 left-0 w-screen h-full z-[-1]" />
            <span>Мэдээлэл</span>
            <span>\</span>
            <span className="text-green-700">Үнэ</span>
          </h2>
          {/* Fixed information */}
          <div className="border-r border-r-blue">
            {compareTitle.map((title, index) => (
              <p
                key={index}
                className={`${
                  index % 2 == 0 ? ' ' : 'bg-gray-100 '
                } whitespace-nowrap py-2 px-5`}
              >
                {title.title}
              </p>
            ))}
          </div>
        </div>

        <div className="flex w-full overflow-x-scroll ">
          {/* Product 1 */}
          <Link href="/" target="_blank">
            <div className="min-w-[150px] max-w-[350px] flex-1 border-r border-r-blue">
              <div
                className={`${styles.height} ${styles.flexAround} px-3 py-5 flex-col`}
              >
                <Image
                  src="/images/Category/computer.jpg"
                  alt=""
                  className="min-h-[100px] max-h-[200px] w-full aspect-[4/3] object-cover mx-auto rounded-xl"
                />
                <h1>
                  Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Q
                </h1>
              </div>

              <div className="text-center">
                <h2 className="relative font-bold p-2 text-green-700">
                  200,000$
                </h2>
                {compareTitle.map((title, index) => (
                  <p
                    key={index}
                    className={`${
                      index % 2 == 0 ? '' : 'bg-gray-100  '
                    } whitespace-nowrap py-2 px-5`}
                  >
                    999
                  </p>
                ))}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </MainContainer>
  );
};

export default Comparing;
