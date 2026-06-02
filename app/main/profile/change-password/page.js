'use client'

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthService } from '../../../api/auth';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password should be between 6 to 8 characters in length')
    .max(8, 'Password should be between 6 to 8 characters in length'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .min(6, 'Confirm Password should be between 6 to 8 characters in length')
    .max(8, 'Confirm Password should be between 6 to 8 characters in length')
    .oneOf([yup.ref('password'), null], 'Confirm Password does not match'),
}).required()

const page = () => {
  const [viewpwd, setViewpwd] = useState('password');
  const [viewcfmpwd, setViewcfmpwd] = useState('password');

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // validates on change, blur, and submit
  });

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');

  const formSubmit = async (data) => {
    const b = await AuthService.changePassword(data.password, data.confirmPassword);
    if (b) {
      toast.success('Password successfully updated');
      return;
    }
  }

  return (
    <Container fluid className='p-6'>
      <div className="row mb-2">
        <div className="col-12">
          <h3 className="m-0 text-dark">Change Password</h3>
        </div>
      </div>
      <div>
        <form className='form-horizontal needs-validation' noValidate onSubmit={handleSubmit(formSubmit)}>
          <div className='card mb-4'>
            <div className='card-body'>
              <div className='form-group row'>
                <label className="col-sm-2 col-form-label">Password&nbsp;<span className="text-danger">*</span></label>
                <div className='col-sm-10'>
                  <div className='input-group mb-2 has-validation'>
                    <input type={viewpwd} placeholder="Password" name="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      {...register('password')}
                    />
                    <button type="button" className="btn btn-primary" onClick={() => setViewpwd(viewpwd === 'password' ? 'text' : 'password')} title={viewpwd === 'password' ? 'Show password' : 'Hide password'}>
                      <i className={`fa ${viewpwd === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                    </button>
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                </div>
              </div>
              <div className='form-group row'>
                <label className="col-sm-2 col-form-label">Confirm Password&nbsp;<span className="text-danger">*</span></label>
                <div className='col-sm-10'>
                  <div className='input-group mb-3 has-validation'>
                    <input type={viewcfmpwd} placeholder="Confirm Password" name="confirmPassword"
                      className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      {...register('confirmPassword')}
                    />
                    <button type="button" className="btn btn-primary" onClick={() => setViewcfmpwd(viewcfmpwd === 'password' ? 'text' : 'password')} title={viewcfmpwd === 'password' ? 'Show password' : 'Hide password'}>
                      <i className={`fa ${viewcfmpwd === 'password' ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                    </button>
                    {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default page;
