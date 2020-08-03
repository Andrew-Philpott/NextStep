import { useState, ChangeEvent, useEffect } from "react";

export const useForm = (fieldValues: any) => {
  const [values, setValues] = useState(fieldValues);
  const [errors, setErrors] = useState(fieldValues);

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
