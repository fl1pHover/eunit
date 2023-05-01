import { Tooltip } from "@chakra-ui/react";

const Tip = ({ lbl, children, className = "" }) => {
  return (
    <Tooltip label={lbl} aria-label="A tooltip" className={className}>
      {children}
    </Tooltip>
  );
};

export default Tip;
