import { useToast } from "@chakra-ui/react";
import mergeNames from "./mergeNames";

const CustomToast = ({
  toastBtn,
  onclick,
  toastH,
  toastP = "",
  alert,
  className,
  stats,
}) => {
  const toast = useToast();

  return (
    <button
      className={mergeNames("flex items-center gap-1", className)}
      // onClick={() => {
      //   toast({
      //     position: 'bottom-center',
      //     render: () => (
      //       <div
      //         className={mergeNames(
      //           'w-3/4  mx-auto p-2 text-white bg-green-500 shadow-xl rounded-md ',
      //           STYLES.flexCenter,
      //           'items-center gap-3',
      //           'border-b-4 border-green-300'
      //         )}
      //       >
      //         <TiTick className="h-full p-1 text-4xl text-green-500 bg-white rounded-full" />

      //         <div className="flex flex-col text-[16px] ">
      //           <p className="font-bold">{toastH} </p>
      //           <p className=" fon-semibold">{toastP}</p>
      //         </div>
      //       </div>
      //     ),
      //     duration: 2000,
      //     isClosable: true,
      //   });
      // }}
      onClick={() => {
        toast({
          title: `${toastH}`,
          description: `${toastP}`,
          status: `${stats}`,
          duration: 2000,
          isClosable: true,
        }),
          onclick;
      }}
    >
      {toastBtn}
    </button>
  );
};

export default CustomToast;
