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
    // <MainContainer>
    //   <div className="flex flex-col w-full ">
    //     <div className="grid w-full grid-cols-3 py-2 border-2 " key={i}>
    //       <button className="mx-5 font-semibold text-left text-gray-500">
    //         {d.user?.username}
    //       </button>
    //       <button className="mx-5 font-semibold text-gray-500">
    //         {d.title}
    //       </button>
    //       <p className="font-bold text-right text-blue-700">{d.message}</p>
    //     </div>
    //   </div>
    // </MainContainer>

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
