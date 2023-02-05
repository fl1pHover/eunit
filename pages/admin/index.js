import urls from '@/constants/api';
import { useAuth } from '@/context/auth';
import { Button, Text } from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';

const Admin = () => {
  const [ads, setAds] = useState([]);
  const { user } = useAuth();
  const token = Cookies.get('token');
  const getData = async () => {
    fetch(`${urls['test']}/ad/notVerify`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((d) => d.json())
      .then((d) => setAds(d));
  };
  useEffect(() => {
    getData();
  }, []);
  const verify = async (id) => {
    fetch(`${urls['test']}/ad/check/{id}?id=${id}`).then((d) => getData());
  };
  const deleteAd = async (id) => {
    fetch(`${urls['test']}/ad/delete/{id}?id=${id}`).then((d) => getData());
  };
  if (user?.userType == 'admin' || user?.userType == 'system') {
    return ads.map((a, i) => {
      return (
        <div className="flex p-4" key={i}>
          <Text>Zariin dugaar: {a.title}</Text>
          <Button onClick={() => verify(a._id)}>verify</Button>
          <Button onClick={() => deleteAd(a._id)}>delete</Button>
        </div>
      );
    });
  }
};
export default Admin;
