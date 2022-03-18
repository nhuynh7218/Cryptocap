import type { NextPage } from 'next'
import NavBar from '../components/layout'
import News from '../components/news' 
import { useFormik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'


const User: NextPage = () => {
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
    },
    onSubmit: () => {
    },
    validationSchema: yup.object({
      name: yup.string().trim().required('Name is required'),
      email: yup
        .string()
        .email('Must be a valid email')
        .required('Email is required'),
      password: yup.string().required('Password is required').min(8, 'Minimum 8 characters')
    }),
  });
  return(
    <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center py-10">
    <div className="bg-yellow-400 rounded-2xl shadow-xl flex flex-col w-1/3 max-w-4xl p-10">
    <div className='text-left font-bold text-xl'>CryptoCap</div>
    <div className='py-10'>
      <h2 className='text-4xl font-bold'>Create an Account</h2>
    </div>
    <form><div className="mb-3">
  <label htmlFor="name" className="form-label pr-1">
    Name: 
  </label>
  <input
    type="text"
    name="name"
    className="form-control"
    placeholder="John Doe"
    value={formik.values.name}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.name && (
    <div className="text-danger">{formik.errors.name}</div>
  )}
</div>

<div className="mb-3">
  <label htmlFor="email" className="form-label pr-1">
    Email: 
  </label>
  <input
    type="email"
    name="email"
    className="form-control"
    placeholder="Email Address"
    value={formik.values.email}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.email && (
    <div className="text-danger">{formik.errors.email}</div>
  )}
</div>

<div className="mb-3">
  <label htmlFor="email" className="form-label pr-1">
    Password: 
  </label>
  <input
    type="password"
    name="password"
    className="form-control"
    placeholder="abc123 is not good"
    value={formik.values.password}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
  />
  {formik.errors.password && (
    <div className="text-danger">{formik.errors.password}</div>
  )}
</div>

<button type="submit" className="btn btn-primary p-1 border-black border-2">
  Sign Up
</button>
</form>
</div>
</main>
  )
}

export default User