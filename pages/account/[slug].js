import { Text } from '@chakra-ui/react';
import { getCookie } from 'cookies-next';
import urls from '../../constants/api';
const Accounts = ({ propUser }) => {
  console.log(propUser);
  return <Text>{JSON.stringify(propUser)}</Text>;
};
export default Accounts;

export async function getServerSideProps(ctx) {
  const { params, req, res } = ctx;
  const { slug } = params;
  const token = getCookie('token', { req, res });
  if (token) {
    const res = await fetch(`${urls['test']}/user/${slug}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = await res.json();
    return {
      props: {
        propUser: user,
      },
    };
  } else {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}
