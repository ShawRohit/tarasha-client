import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { API_ENDPOINT } from '../../utils/constant';
import eventBus from '../../utils/eventBus';
import { Ring } from '@uiball/loaders';
import './style.css';
const ResetPassword: React.FC = () => {
  const [loading, setLoading] = React.useState(false)
  const { token } = useParams();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      newPassword: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
          'Password must meet following criteria, min-length = 8, with at least 1 digit, lowercase, uppercase, special character'
        )
        .required('Password is required'),

      confirmPassword: Yup.string()
        .matches(
          /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/,
          'Password must meet following criteria, min-length = 8, with at least 1 digit, lowercase, uppercase, special character'
        )
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await fetch(API_ENDPOINT.RESET_PASSWORD, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ newPassword: values?.newPassword, token: token }),
        });
        await response.json();
        if (response.ok) {
          eventBus.emit("toast:success", "Password change successfull");
          navigate('/')
        }else{
          throw new Error('Password reset failed');
        }
      } catch (error) {
        eventBus.emit("toast:error", "Failed Reset Password")
      }finally{
        setLoading(false);
      }
    },
  });

  return (
    <div className='reset-pass'>
      <p className='text-styled auth-header-text pb-4'>Reset password</p>
      <form
        onSubmit={formik.handleSubmit}
        className='auth-form rounded-[2px] border-black border-2 p-6 flex flex-col w-96 items-start'
      >

        <input
          id='password'
          name='newPassword'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
          className='border-2 h-10 p-2 w-full'
          placeholder='Password'
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <div className='text-red-500 pb-2'>{formik.errors.newPassword}</div>
        ) : null}

        <input
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className='border-2 h-10 p-2 w-full'
          placeholder='Confirm Password'
        />
        {formik.touched.newPassword && formik.errors.confirmPassword ? (
          <div className='text-red-500 pb-2'>{formik.errors.confirmPassword}</div>
        ) : null}

{!loading && <button type='submit' className='flex justify-center items-center mt-2'>
        Reset password
    </button>}
    {
      loading && <button className='flex justify-center items-center mt-2'>
      <Ring color='#ffffff'/>
  </button>
    }

      </form>
    </div>
  );
};

export default ResetPassword;
