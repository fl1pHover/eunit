import { FaRegUser } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdDateRange, MdEmail } from 'react-icons/md';
import { RiVipCrown2Line } from 'react-icons/ri';

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
    default:
      return <></>;
  }
};

export default InputIcon;
