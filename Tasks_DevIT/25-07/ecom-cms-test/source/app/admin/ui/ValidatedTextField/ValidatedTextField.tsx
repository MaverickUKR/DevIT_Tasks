import { TextField, TextFieldProps } from "@shopify/polaris";
import { useCallback, useState } from "react";
import { useField } from "remix-validated-form";

export type ValidatedTextFieldProps = TextFieldProps & {
  name: string;
};

export const ValidatedTextField = (props: ValidatedTextFieldProps) => {
  const { name, type, ...rest } = props;
  const { error, getInputProps } = useField(name);
  const { onChange: inputPropsOnChange, ...restInputProps } = getInputProps();
  const [value, setValue] = useState<string>("");

  const onChange = useCallback(
    (val: string) => {
      setValue(val);
      inputPropsOnChange?.(val);
    },
    [setValue, inputPropsOnChange]
  );

  // console.log(`getInputProps ${name}`, getInputProps({ id: name }));

  return (
    <TextField
      value={value}
      onChange={onChange}
      // autoComplete="off"
      {...rest}
      {...restInputProps}
      type={type}
      error={error}
    />
  );
};
