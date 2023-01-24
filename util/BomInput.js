import { FormControl, FormLabel, Select, Textarea } from '@chakra-ui/react';
import { Input } from 'postcss';

const BomSelect = ({ children, placeholder, onChange, value }) => (
  <Select
    placeholder={placeholder}
    size="sm"
    onChange={onChange}
    value={value}

    // onChange={(e) => setAdType(e.target.value)}
    // value={adType}
  >
    {children}
    {/* {Object.keys(AdTypes).map((type, key) => {
      return (
        <option key={key} value={AdTypes[type].id}>
          {AdTypes[type].name}
        </option>
      );
    })} */}
  </Select>
);

const BomInput = ({ onChange, value, placeholder, lbl }) => {
  <FormControl variant="floating" isRequired>
    <Input onChange={onChange} value={value} placeholder={placeholder} />
    <FormLabel>{lbl}</FormLabel>
  </FormControl>;
};

const BomArea = ({ placeholder, onChange, value }) => (
  <Textarea
    placeholder={placeholder}
    type="textarea"
    height="100px"
    whiteSpace={'nowrap'}
    onChange={onChange}
    value={value}
    required
  />
);

export { BomSelect, BomArea, BomInput };
