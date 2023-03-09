import { STYLES } from '@/styles/index';
import mergeNames from '@/util/mergeNames';
import { Select } from '@chakra-ui/react';

const FilterAd = ({ onChange, children, plc }) => {
  return (
    <Select
      className={mergeNames(STYLES.select)}
      placeholder={plc}
      onChange={onChange}
    >
      {children}
    </Select>
  );
};

export default FilterAd;
