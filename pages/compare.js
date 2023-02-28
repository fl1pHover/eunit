import { useAuth } from '@/context/auth';
import { Image, Link } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BiRightArrowAlt } from 'react-icons/bi';
import MainContainer from '../layout/mainContainer';
import { STYLES } from '../styles';


const Comparing = () => {
  const {compareAds, setCompareAds} = useAuth()
  const router=useRouter()
  return (
    <div className="">
      <MainContainer>
        <div className="flex bg-white my-10 rounded-[20px] sm:text-[14px] md:text-[16px] text-[12px]">
          <div className="flex flex-col">
            {/* Zariin zurag garchig */}
            <div
              className={`${STYLES.height} h-[250px] sm:h-[350px] w-full border-r border-r-blue`}
            >
              <Image
                src="/images/logo/bom-blue-text.png"
                alt="asd"
                className="object-contain h-full w-[150px]  mx-auto p-5 "
              />
            </div>
            <h2 className="relative font-bold bg-[#eef0f2] p-2 z-0 flex justify-around">
              <span className="bg-[#eef0f2] absolute top-0 left-0 w-screen h-full z-[-1]" />
              <span>Мэдээлэл</span>

            </h2>
            {/* Fixed information */}
            <div className="border-r border-r-blue">
              {compareAds.length > 0 && compareAds[0]?.filters?.map((f, index) => (
                <p
                  key={index}
                  className={`${
                    index % 2 == 0 ? ' ' : 'bg-gray-100 '
                  } whitespace-nowrap py-2 px-5`}
                >
                  {f.name}
                </p>
              ))}
            </div>
          </div>
          <div className="flex w-full overflow-x-scroll ">
            {/* Product 1 */}
            {compareAds.length > 0 && compareAds.map((c,i) => {
              return <div href="/" target="_blank" key={i}>
              <div className="min-w-[150px] max-w-[350px] flex-1 border-r border-r-blue">
                <div
                  className={`${STYLES.height} ${STYLES.flexAround} px-5 py-5 flex-col`}
                >
                  <Image
                    src={c.images[0] ?? "/images/Category/computer.jpg"}
                    alt=""
                    className="min-h-[100px] max-h-[200px]  object-cover mx-auto rounded-xl"
                  />
                  <h1 className="font-bold">{c.title}</h1>
                  <button className="flex flex-row items-center gap-6 px-4 py-1 font-bold text-white bg-blue-500 rounded-2xl"onClick={() => {
                    router.push(`/product/${c.num}`).then(() => setCompareAds([]))}
                    
                  }>
                    Орох
                    <BiRightArrowAlt className="text-blue-800 bg-white rounded-full" />
                  </button>
                </div>
                <div className="text-center">
                  <h2 className="relative p-2 font-bold text-green-700">
                    &nbsp;
                  </h2>
                  {c.filters?.map((f, index) => (
                    <p
                      key={index}
                      className={`${
                        index % 2 == 0 ? '' : 'bg-gray-100  '
                      } whitespace-nowrap py-2 px-5`}
                    >
                      {f.input}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            })}
          </div>
        </div>
      </MainContainer>
    </div>
  );
};

export default Comparing;
