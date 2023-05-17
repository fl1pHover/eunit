import { useState } from 'react';

import { categories } from '@/data/categories';
import CategoryBottom from './bottom';
import UpperNav from './upper';
const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  return (
    <>
      {/* <Higher /> */}
      <div
        className="sticky top-0 z-20"
        id="navbar"
        as={'section'}
        // pos={sticky ? 'sticky' : 'relative'}
      >
        <CategoryBottom {...{ sticky }} data={categories} />
        <UpperNav />
      </div>
    </>
  );
};

export default Navbar;
