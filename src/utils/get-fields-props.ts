import { FormikValues, FormikErrors, FormikTouched } from 'formik';

export const getFieldProps = <U extends FormikValues>(
  errors: FormikErrors<U>,
  touched: FormikTouched<U>,
  name: keyof U
) => {
  return {
    name,
    error: Boolean(errors[name]) && Boolean(touched[name]),
    helperText: touched[name] && (errors[name] as string)
  };
};
