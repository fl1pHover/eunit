import { ContainerX } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Heading } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';

const CheckStatus = () => {
  return (
    <ContainerX
      className={mergeNames(STYLES.flexCenter, 'items-center h-[70vh]')}
    >
      <Heading variant="mainHeading">Мэйл хаягаа шалгана уу!</Heading>
    </ContainerX>
  );
};

export default CheckStatus;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  const { user } = useSelector((state) => state.user);
  if (token) {
    try {
      if (user?.userType == 'admin' || user?.userType == 'system') {
        return {
          redirect: {
            destination: '/admin/request/realState',
            permanent: false,
          },
        };
      } else {
        return {
          redirect: {
            destination: '/',
            permanent: false,
          },
        };
      }
    } catch (err) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
