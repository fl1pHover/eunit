import { getCookie } from 'cookies-next';
import { useSelector } from 'react-redux';

const Admin = ({ propAds }) => {};
export default Admin;

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
