import { getCookie } from 'cookies-next';

const Create = () => {};
export default Create;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });

  if (token) {
    return {
      redirect: {
        destination: '/create/ad',
        permanent: false,
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
