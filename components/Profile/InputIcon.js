import { FaRegUser } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { IoExpand } from 'react-icons/io';
import { MdDateRange, MdEmail } from 'react-icons/md';
import { RiVipCrown2Line } from 'react-icons/ri';
import { RxLayers } from 'react-icons/rx';

// Dashboard deerh iconuud

const InputIcon = ({ href, ...props }) => {
  switch (href) {
    case 'phone':
      return <FiPhone {...props} />;
    case 'agent':
      return <RiVipCrown2Line {...props} />;
    case 'date':
      return <MdDateRange {...props} />;
    case 'username':
      return <FaRegUser {...props} />;
    case 'email':
      return <MdEmail {...props} />;

    // compare icon
    case 'floor':
      return <RxLayers {...props} />;
    case 'square':
      return <IoExpand {...props} />;
    default:
      return <></>;
  }
};

export default InputIcon;
