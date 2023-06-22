import urls from '@/constants/api';
import { ContainerX } from '@/lib/Container';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Feedback = ({ feedbacks }) => {
  const [feedback, setF] = useState([]);
  useEffect(() => {
    setF(feedbacks);
  }, [feedbacks]);

  return (

    <ContainerX classname="p-2 my-5">
      <table class="table-auto border border-gray-400">
        <thead>
          <tr>
            <th>Нэр</th>
            <th className="w-1/2">Гарчиг</th>
            <th className="w-1/2">Дэлгэрэнгүй</th>
          </tr>
        </thead>

        <tbody>
          {feedback?.map((d, i) => {
            return (
              <tr key={i}>
                <td> {d.user?.username}</td>
                <td> {d.title}</td>
                <td>{d.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </ContainerX>
  );
};
export default Feedback;

export async function getServerSideProps({ req, res }) {
  const token = getCookie('token', { req, res });
  const { user } = useSelector((state) => state.user);
  if (token) {
    try {
      if (user?.userType == 'admin' || user?.userType == 'system') {
        const feedbacks = await fetch(`${urls['test']}/user/feedback/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const feedbacksJson = await feedbacks.json();
        return {
          props: {
            feedbacks: feedbacksJson,
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
