import { useState } from 'react';

import { categories } from '@/data/categories';
import CategoryBottom from './bottom';
import UpperNav from './upper';

const Navbar = ({user}) => {
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
