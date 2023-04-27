import { useEffect, useState } from 'react';

import { categories } from '@/data/categories';
import axios from 'axios';
import { getCookie } from 'cookies-next';
import urls from '../../constants/api';
import CategoryBottom from './bottom';
import UpperNav from './upper';
const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [user, setUser] = useState();
  const token = getCookie('token');
  const getUser = async () => {
    await axios
      .get(`${urls['test']}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Headers': '*',
        },
      })
      .then((d) => setUser(d.data));
  };
  useEffect(() => {
    if (token) getUser();
  }, [token]);
  // const { categories } = useAuth();
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setSticky(window.scrollY > 0);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // });

  return (
    <>
      {/* <Higher /> */}
      <div
        className="sticky top-0 z-20"
        id="navbar"
        as={'section'}
        // pos={sticky ? 'sticky' : 'relative'}
      >
        <CategoryBottom {...{ sticky }} data={categories} user={user} />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
