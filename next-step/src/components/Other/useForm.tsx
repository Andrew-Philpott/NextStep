import { useState, ChangeEvent } from "react";

export const useForm = (initialFieldValues: any) => {
  const [values, setValues] = useState(initialFieldValues);
  const [errors, setErrors] = useState(initialFieldValues);
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
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
