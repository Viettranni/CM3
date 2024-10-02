// useField.js

import { useState } from "react";

const useField = (type, id) => {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.value);

  return {
    id,
    type,
    value,
    onChange,
  };
};
export default useField;
