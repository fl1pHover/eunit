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
  const clear = () => {
    setState({});
    setId({});
  };
  return [state, handle, id, clear];
};
export default useEstimate;
