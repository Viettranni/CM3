// useField.js

import { useState } from "react";

const useField = (type, id, initialValue = "") => {
  const [value, setValue] = useState(initialValue);

  const onChange = (event) => setValue(event.target.value);

  return {
    id,
    type,
    value,
    onChange,
  };
};
export default useField;
