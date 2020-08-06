import React from "react";

export const useForm = (fieldValues: any) => {
  const [values, setValues] = React.useState(fieldValues);
  const [errors, setErrors] = React.useState(fieldValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
