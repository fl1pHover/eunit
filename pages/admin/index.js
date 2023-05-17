import { getCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Admin = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const token = getCookie('token');
  useEffect(() => {
    if (user) {
      if (user.userType == 'admin' || user.userType == 'system') {
        router.push('/admin/request/realState');
      } else {
      }
    } else {
    }
  }, [token, user]);
};
export default Admin;

// export async function getServerSideProps({ req, res }) {
//   const token = getCookie('token', { req, res });
//   const { user } = useSelector((state) => state.user);
//   if (token) {
//     try {
//       if (user?.userType == 'admin' || user?.userType == 'system') {
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
