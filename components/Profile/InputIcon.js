import { FaRegUser } from 'react-icons/fa';
import { FiPhone } from 'react-icons/fi';
import { MdDateRange } from 'react-icons/md';
import { RiVipCrown2Line } from 'react-icons/ri';

const InputIcon = ({ href, ...props }) => {
  //   return <div>CategoryIcon</div>;
  switch (href) {
    case 'phone':
      return <FiPhone {...props} />;
    case 'agent':
      return <RiVipCrown2Line {...props} />;
    case 'date':
      return <MdDateRange {...props} />;
    case 'username':
      return <FaRegUser {...props} />;

    default:
      return <></>;
  }
};

export default InputIcon;
