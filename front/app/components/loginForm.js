'use client';

import { useFormik } from 'formik';
import { loginUser } from '@/lib/features/user/userActions';
import { selectError } from '@/lib/features/user/userSelectors';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import {
  StyledErrorMessage,
  StyledInput,
} from '@/app/components/styled_components';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length < 2) {
    errors.name = 'Min 2 characters';
  } else if (values.name.length > 8) {
    errors.name = 'Max 8 characters';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 3) {
    errors.password = 'Min 3 characters';
  } else if (values.password.length > 8) {
    errors.password = 'Max 8 characters';
  }
  return errors;
};

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      formik.errors.login = null;
      dispatch(loginUser(values));
      if (!error) {
        push('/');
      } else {
        formik.errors.login = error;
      }
      setSubmitting(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className='mb-4'>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Username
        </label>
        <StyledInput
          type='text'
          id='name'
          name='name'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={formik.touched.name && formik.errors.name}
          touched={formik.touched.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <StyledErrorMessage>{formik.errors.name}</StyledErrorMessage>
        ) : null}
      </div>
      <div className='mb-4'>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700'
        >
          Password
        </label>
        <StyledInput
          type='password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
          touched={formik.touched.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <StyledErrorMessage>{formik.errors.password}</StyledErrorMessage>
        ) : null}
      </div>
      <button
        type='submit'
        disabled={formik.isSubmitting}
        className='rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700'
      >
        Login
      </button>
      {formik.errors.login ? (
        <StyledErrorMessage>{formik.errors.login}</StyledErrorMessage>
      ) : null}
    </form>
  );
}
