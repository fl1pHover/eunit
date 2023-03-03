import mergeNames from '@/util/mergeNames';
import Image from 'next/image';
import { STYLES } from '../styles';

export const MainLoader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 w-screen h-screen bg-white lds-ellipsis ">
      <div
        className={mergeNames(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          STYLES.flexCenter,
          'flex-col items-center'
        )}
      >
        <Image
          src="/images/logo/bom-blue-text.png"
          width={160}
          height={80}
          fill
        />
        <span className="loader"></span>
      </div>
    </div>
  );
};
