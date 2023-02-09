import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const ButtonProcess = () => {
  return (
    <div className="relative w-full h-5 overflow-hidden bg-emerald-700/30 rounded-xl">
      <div className="absolute top-0 bottom-0 left-0 bg-emerald-500 h-5 w-[10vw]" />
      <p className="absolute top-0 left-[10vw] bottom-0 flex justify-center items-center font-semibold">
        10%
      </p>
    </div>
  );
};

const StepButtons = ({
  onPrev = () => {},
  loading = false,
  onNext = () => {},
  txt = 'Дараах',
}) => {
  return (
    <div className="mt-4">
      {/* <ButtonProcess /> */}
      <div className="flex flex-row justify-between pt-2">
        <button
          onClick={onPrev}
          className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-red-400 rounded-full"
        >
          <FiArrowLeft size={20} />
          Буцах
        </button>
        <button
          disabled={loading}
          onClick={onNext}
          className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full"
        >
          {txt}
          <FiArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default StepButtons;
