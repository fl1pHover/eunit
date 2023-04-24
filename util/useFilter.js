import { useState } from "react";

export const useFilter = () => {
  const [state, setState] = useState({});
  const [id, setId] = useState({});
  const [min, setMin] = useState({});
  const [max, setMax] = useState({});
  const handleChange = (name, value, type, isMin) => {
    if (type != null) {
      setId((prev) => ({ ...prev, [name]: type }));
    }
    if (isMin == "true") {
      setMin((prev) => ({ ...prev, [name]: value }));
    } else {
      if (isMin == "false") {
        setMax((prev) => ({ ...prev, [name]: value }));
      } else {
        setState((prev) => ({ ...prev, [name]: value }));
      }
    }
  };
  const clear = () => {
    setState({})
    setId({})
    setMin({})
    setMax({})
  }
  return [state, handleChange, id, min, max, clear];
};

export default useFilter;
