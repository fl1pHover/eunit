import { Box } from '@chakra-ui/react';
import { useState } from 'react';

import { categories } from '@/data/categories';
import CategoryBottom from './bottom';
import UpperNav from './upper';

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
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
      <Box
        top="0"
        id="navbar"
        zIndex={'20'}
        as={'section'}
        // pos={sticky ? 'sticky' : 'relative'}
        pos={'sticky'}
      >
        <CategoryBottom {...{ sticky }} data={categories} />
        <UpperNav />
      </Box>
    </>
  );
};

export default Navbar;
