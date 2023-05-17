import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Request = ({ propAds }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  // if (user) {
  //   if (user.userType == 'admin' || user.userType == 'system') {
  //     router.push('/admin/request/realState');
  //   } else {
  //     router.push('/');
  //   }
  // } else {
  //   router.push('/login');
  // }
};

export default Request;

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie('token', { req, res });
//   const { user } = useSelector((state) => state.user);
//   if (token) {
//     try {
//       if (user?.userType == 'Request' || user?.userType == 'system') {
//         return {
//           redirect: {
//             destination: '/admin/request/realState',
//             permanent: false,
//           },
//         };
//       } else {
//         return {
//           redirect: {
//             destination: '/',
//             permanent: false,
//           },
//         };
//       }
//     } catch (err) {
//       return {
//         redirect: {
//           destination: '/login',
//           permanent: false,
//         },
//       };
//     }
//   } else {
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false,
//       },
//     };
//   }
// }
