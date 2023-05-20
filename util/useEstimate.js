import { useState } from "react";

export const useEstimate = () => {
  const [state, setState] = useState({});
  const [id, setId] = useState({});

  const handle = (name, value, type) => {
    setState((state) => ({ ...state, [name]: value }));

    if (type != "" && type != null) {
      setId((prev) => ({ ...prev, [name]: type }));
    }
  };
  return [state, handle, id];
};
export default useEstimate;
