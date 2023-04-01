import urls from '@/constants/api';
import { getCookie } from 'cookies-next';

const Feedback = ({ propAds }) => {};
export default Feedback;

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
        const ads = await fetch(`${urls['test']}/user/feedback/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const adsJson = await ads.json();
        return {
          props: {
            propAds: adsJson,
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
