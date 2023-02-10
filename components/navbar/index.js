import { useAuth } from '@/context/auth';
import { Box } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import CategoryBottom from './bottom';
import Higher from './higher';
import UpperNav from './upper';
import { categories } from '@/data/categories';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  // const { categories } = useAuth();
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <>
      <Higher />
      <Box
        top="0"
        id="navbar"
        zIndex={'20'}
        as={'section'}
        pos={sticky ? 'sticky' : 'relative'}
      >
        <UpperNav />
        <CategoryBottom {...{ sticky }} data={categories} />
      </Box>
    </>
  );
};

export default Navbar;
