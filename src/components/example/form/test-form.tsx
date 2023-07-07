import { Button, Divider, LinearProgress, styled } from '@mui/material';
import { SnackStore } from '@store';
import { WithStores } from '@types';
import { getFieldProps, withStores } from '@utils';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-mui';
import { object, string } from 'yup';

import { FieldSet } from '../../ui';

enum FormValues {
  email = 'email',
  password = 'password'
}

interface Values {
  [FormValues.email]: string;
  [FormValues.password]: string;
}

const StyledForm = styled(Form)(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing(2)
}));

interface TestFormProps {
  initialValues: Values;
}

const stores = {
  snack: SnackStore
};

const TestFormView: WithStores<typeof stores, TestFormProps> = ({ initialValues, snack }) => {
  return (
    <Formik<Values>
      initialValues={initialValues}
      validationSchema={object({
        [FormValues.email]: string().required().email(),
        [FormValues.password]: string().required()
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          snack.success(JSON.stringify(values, null, 2));
        }, 5000);
      }}
    >
      {({ submitForm, isSubmitting, errors, touched }) => (
        <StyledForm>
          <FieldSet disabled={isSubmitting}>
            <Field
              type="email"
              label="Email"
              component={TextField}
              fullWidth
              variant="outlined"
              {...getFieldProps(errors, touched, FormValues.email)}
            />
            <Divider />
            <Field
              type="password"
              label="Password"
              component={TextField}
              fullWidth
              variant="outlined"
              {...getFieldProps(errors, touched, FormValues.password)}
            />
          </FieldSet>
          {isSubmitting && <LinearProgress />}
          <Divider />
          <Button variant="contained" color="primary" disabled={isSubmitting} onClick={submitForm}>
            Submit
          </Button>
        </StyledForm>
      )}
    </Formik>
  );
};

export const TestForm = withStores(stores)(TestFormView);
