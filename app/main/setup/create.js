import React, { useEffect, useState, useRef, useImperativeHandle, forwardRef } from 'react';
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Loading } from '../../../components/Loading';

const schema = yup.object({
  desc: yup.string()
    .required('Description is required')
    .max(300, 'Max length for Description is 300'),
  code: yup.string()
    .required('Code is required')
    .max(30, 'Max length for Code is 30'),
  ref: yup.string()
    .required('Reference is required')
    .max(200, 'Max length for Reference is 200'),
}).required()

const Create = forwardRef(({ title, data, loading, onFormSubmit }, ref) => {
  const router = useRouter();

  useImperativeHandle(ref, () => ({
    resetForm: () => {
      reset()
    }
  }));

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
    if (!loading && data) {
      reset(data);
    }
  }, [loading, data])

  const formSubmit = (data) => {
    onFormSubmit(data);
  }

  if (loading) {
    return <Loading />
  }

  return (
    <>
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
                  <label className="col-sm-2 col-form-label">VESALIUS Description&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Description" name="desc"
                      className={`form-control ${errors.desc ? 'is-invalid' : ''}`}
                      {...register('desc')}
                    />
                    {errors.desc && <div className="invalid-feedback">{errors.desc.message}</div>}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">SMRP Code&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Code" name="code"
                      className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                      {...register('code')}
                    />
                    {errors.code && <div className="invalid-feedback">{errors.code.message}</div>}
                  </div>
                </div>
                <div className="row mb-2">
                  <label className="col-sm-2 col-form-label">Reference&nbsp;<span className="text-danger">*</span></label>
                  <div className="col-sm-10">
                    <input type="text" placeholder="Reference" name="ref"
                      className={`form-control ${errors.ref ? 'is-invalid' : ''}`}
                      {...register('ref')}
                    />
                    {errors.ref && <div className="invalid-feedback">{errors.ref.message}</div>}
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
})

export default Create;
