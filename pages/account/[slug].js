import urls from '@/constants/api';
import { Text } from '@chakra-ui/react';

const Profiles = ({ user }) => {
  return <Text>{JSON.stringify(user)}</Text>;
};
export default Profiles;
export async function getServerSideProps(ctx) {
  const { params } = ctx;
  const { slug } = params;
  const res = await fetch(`${urls['test']}/user/${slug}`);
  const user = await res.json();
  return {
    props: {
      user,
    },
  };
}
