'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import UserService from '../../../../../api/setup/user';
import LookupService from '../../../../../api/lookup';
import { Loading } from '../../../../../../components/Loading';

const schema = yup.object({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required')
    .min(6, 'Password should be between 6 to 8 characters in length')
    .max(8, 'Password should be between 6 to 8 characters in length'),
  first_name: yup.string()
    .required('First name is required'),
  last_name: yup.string().optional(),
  role_id: yup.string().required('Role is required'),
}).required()

const page = () => {
  const router = useRouter();
  const title = 'User';
  const [lockRole, setLockRole] = useState(false);
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // validates on change, blur, and submit
  })

  useEffect(() => {
    load()
  }, [id])

  const load = async () => {
    setLoading(true);
    const roleList = await LookupService.listGroup();
    setRoles(roleList);
    if (id) {
      const response = await UserService.edit(id);
      if (response) {
        const roles = response.roles || [];
        let role_id = 0;
        if (roles.length > 0) {
          role_id = roles[0].id;
        }
        setData(response);
        setValue('username', response.username);
        setValue('password', '********');
        setValue('first_name', response.first_name);
        setValue('last_name', response.last_name);
        setValue('role_id', role_id);
      }
    }

    setLoading(false);
  }

  const formSubmit = async (data) => {
    const o = {
      username: data.username,
      password: data.password,
      first_name: data.first_name,
      last_name: data.last_name
    }
    if (!lockRole) {
      o['role_id'] = Number(data.role_id);
    }

    const b = await UserService.update(id, o);
    if (b) {
      toast.success(`${title} successfully updated`);
    }
  }

  const getRole = () => {
    const roles = data?.roles || [];
    if (roles.length > 0) {
      return roles[0].name;
    }
    return '';
  }

  return (
    <>
      <Loading loading={loading} />
      <Container fluid className='p-6'>
        <div className="row mb-2">
          <div className="col-12">
            <h3 className="m-0 text-dark">Add / Edit {title}</h3>
          </div>
        </div>
        <div>
          <form className="form-horizontal needs-validation" noValidate onSubmit={handleSubmit(formSubmit)}>
            <div className="card">
              <div className="card-body">
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">Username&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Username"
                      className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                      {...register('username')}
                    />
                    {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">Password&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      {...register('password')}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">First name&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="First name"
                      className={`form-control ${errors.first_name ? 'is-invalid' : ''}`}
                      {...register('first_name')}
                    />
                    {errors.first_name && <div className="invalid-feedback">{errors.first_name.message}</div>}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">Last name</label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Last name"
                      className={`form-control ${errors.last_name ? 'is-invalid' : ''}`}
                      {...register('last_name')}
                    />
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">Role&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    {lockRole && (
                      <input type="text" placeholder="Role" className="form-control" value={getRole()} readOnly={true} />
                    )}
                    {!lockRole && (
                      <select
                        className={`form-select ${errors.role_id ? 'is-invalid' : ''}`}
                        {...register('role_id')}
                      >
                        <option value="" disabled>Please select</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    )}
                    {!lockRole && errors.role_id && <div className="invalid-feedback">{errors.role_id.message}</div>}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button type="button" className="btn btn-outline-dark me-2" onClick={() => router.back()}><i className="fas fa-chevron-circle-left"></i> Back</button>
                <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
              </div>
            </div>
          </form>
        </div>
      </Container>
    </>
  )
}

export default page;
