import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Image } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdCompareArrows } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { clearCompare, updateCompare } from 'store/slice/compare';

const CompareItem = ({ item, onClick }) => {
  let image = item.images?.[0] ?? '/images/noImage.png';
  return (
    <div className="w-full h-full bg-white max-w-[250px]  relative ">
      <Image src={image} alt="compare ads image" />

      {/* Delete button*/}
      <div
        className="absolute delete -top-[10px] -right-[10px] rounded-full cursor-pointer"
        onClick={onClick}
      />
    </div>
  );
};

const CompareSelect = ({ btnView = true,  }) => {
  const router = useRouter();
  const [expand, setExpand] = useState(false);
  const { compare } = useSelector((state) => state.compare);
  const dispatch = useDispatch();

  return (
    <div>
      {/* <div className="grid grid-cols-1 gap-4 mt-5 sm:grid-cols-2">
        <FilterAd plc="Бүх төрөл" onChange={(e) => {}}>
          <option value=""></option>
        </FilterAd>
        <FilterAd plc="Бүх дэд төрөл" onChange={(e) => {}}>
          <option value=""></option>
        </FilterAd>
      </div> */}
      <div
        className={mergeNames(
          'fixed px-[10%] bottom-0 left-0',
          'bg-secondary/90 w-screen transition-all ease-in-out pb-[68px] md:pb-0',
          ' text-[12px] sm:text-base  z-10',
          compare.length > 0 && router?.pathname != '/compare'
            ? 'h-[250px]'
            : 'h-0'
        )}
      >
        {btnView && (
          <button
            className="h-[50px] gap-2 px-5 bg-secondary/90 absolute -top-[65px] rounded-2xl left-[15px] flex place-items-center text-white  z-30"
            onClick={() => setExpand(!expand)}
          >
            <MdCompareArrows
              className={mergeNames(
                'text-xl ',
                expand ? 'rotate-0' : 'rotate-180'
              )}
            />
            <p className="text-[12px]">Харьцуулах</p>
          </button>
        )}
        <div
          className={mergeNames(STYLES.flexBetween, 'pt-5 text-white w-full')}
        >
          <p>
            Харьцуулах ( <span> {compare.length}</span>/4 )
          </p>
          <div className="flex gap-2 transition-all ease-in-out">
            <button
              onClick={() => {
                dispatch(clearCompare());
              }}
            >
              Цэвэрлэх
            </button>
            <button
              onClick={() => router.push('/compare')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-2xl"
            >
              Харьцуулах
            </button>
          </div>
        </div>
        <div className="grid h-full grid-cols-4 gap-1 my-5 md:gap-6">
          {/* Compare item */}
          {compare?.length > 0 &&
            compare?.map((cAds, i) => {
              return (
                <CompareItem
                  item={cAds}
                  key={i}
                  onClick={() => {
                    let ads = compare.filter((ad) => ad._id != cAds._id);
                    dispatch(updateCompare(ads));
                  }}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CompareSelect;
