'use client'

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Create from '../../create';
import ReligionService from '../../../../api/setup/religion';
import { Loading } from '../../../../../components/Loading';

const page = () => {
  const title = 'Religion';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    const b = await ReligionService.create(data);
    if (b) {
      toast.success(`New ${title} successfully created`);
      childRef.current.resetForm();
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Create
      title={title}
      data={data}
      loading={loading}
      onFormSubmit={formSubmit}
      ref={childRef}
    />
  )
}

export default page;
