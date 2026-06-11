'use client'

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Create from '../../create';
import WardClassService from '../../../../api/setup/ward-class';
import { Loading } from '../../../../../components/Loading';

const page = () => {
  const title = 'Ward Class';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    const b = await WardClassService.create(data);
    if (b) {
      toast.success(`New ${title} successfully created`);
      childRef.current.resetForm();
    }
  }

  return (
    <>
      <Loading loading={loading} />
      <Create
        title={title}
        data={data}
        loading={loading}
        onFormSubmit={formSubmit}
        ref={childRef}
      />
    </>
  )
}

export default page;
