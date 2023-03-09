import { ContainerX } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Heading } from '@chakra-ui/react';

const CheckStatus = () => {
  return (
    <ContainerX
      classname={mergeNames(STYLES.flexCenter, 'items-center h-[70vh]')}
    >
      <Heading variant="mainHeading">Мэйл хаягаа шалгана уу!</Heading>
    </ContainerX>
  );
};

export default CheckStatus;
