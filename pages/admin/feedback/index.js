import urls from '@/constants/api';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';

const Feedback = ({ feedbacks }) => {
  const [feedback, setF] = useState([]);
  useEffect(() => {
    setF(feedbacks);
  }, [feedbacks]);
  return feedback?.map((d, i) => {
    return (
      <div className="flex flex-col w-full gap-3 mt-4" key={i}>
        <div className="grid w-full grid-cols-3">
          <button className="mx-5 font-semibold text-left text-gray-500">
            {d.user?.username}
          </button>
          <button className="mx-5 font-semibold text-gray-500">
            {d.title}
          </button>
          <p className="font-bold text-right text-blue-700">{d.message}</p>
        </div>
      </div>
    );
  });
};
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
