import CustomModal from '@/util/CustomModal';
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
  data,
  txt = 'Дараах',
  onClick = () => {},
  step,
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

        {step == 2 ? (
          <CustomModal
            btnOpen={
              <>
                Илгээх <FiArrowRight size={20} />
              </>
            }
            onclick={onNext}
            btnClose="Нэмэх"
            btnClose2="Буцах"
            header="Баталгаажуулах хэсэг"
          >
            <div className="grid grid-cols-2 p-2 text-sm border border-collapse">
              <div className="font-bold">Гарчиг</div>
              <div>{data.title}</div>
            </div>
          </CustomModal>
        ) : (
          <button
            disabled={loading}
            onClick={onNext}
            className="flex flex-row items-center gap-1 px-4 py-2 font-bold text-white bg-blue-500 rounded-full a"
          >
            {/* <AiOutlineLoading3Quarters
            className={mergeNames(loading ? 'animate-spin' : 'hidden')}
          /> */}
            {txt}
            <FiArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default StepButtons;
