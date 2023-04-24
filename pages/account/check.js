import { ContainerX } from '@/lib/Container';
import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Heading } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';

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

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (token) {
    try {
      const response = await fetch(`${urls['test']}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const user = await response.json();
      // const adRes = await
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
