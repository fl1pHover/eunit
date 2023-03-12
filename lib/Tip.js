import { Tooltip } from '@chakra-ui/react';

const Tip = ({ lbl, children }) => {
  return (
    <Tooltip label={lbl} aria-label="A tooltip">
      {children}
    </Tooltip>
  );
};

export default Tip;
