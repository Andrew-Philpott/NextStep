import { useState } from "react";

export const useForm = (initialFieldValues) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const fieldValue = { [name]: value };
    setValues({
      ...values,
      ...fieldValue,
    });
  };
  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
  };
};
