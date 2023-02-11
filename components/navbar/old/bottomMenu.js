import { useRouter } from 'next/router';
import { AiFillCalculator } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { IoWallet } from 'react-icons/io5';

const Container = ({ text = '', Icon = () => <></>, onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center w-1/5 py-4 text-center cursor-pointer group"
    >
      <Icon
        size={20}
        className="text-white group-hover:text-amber-300 group-hover:scale-110"
      />
      <p className="text-xs font-semibold text-white group-hover:text-amber-300">
        {text}
      </p>
    </button>
  );
};

const BottomMenu = (props) => {
  const router = useRouter();

  const handleLink = (link) => {
    router.push(link);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 w-screen md:hidden bg-mainBlossom">
      <div className="flex flex-row">
        <Container
          onClick={() => handleLink('/')}
          text="Нүүр"
          Icon={(props) => <HiHome {...props} />}
        />
        <Container
          onClick={() => handleLink('/wallet')}
          text="Хэтэвч"
          Icon={(props) => <IoWallet {...props} />}
        />
        <Container
          onClick={() => handleLink('/')}
          text="Хайлт"
          Icon={(props) => <BiSearch {...props} />}
        />
        <Container
          onClick={() => handleLink('/estimate')}
          text="Үнэлгээ"
          Icon={(props) => <AiFillCalculator {...props} />}
        />
        <Container
          text="Профайл"
          onClick={() => handleLink('/account')}
          Icon={(props) => <FaUserCircle {...props} />}
        />
      </div>
    </div>
  );
};

export default BottomMenu;
