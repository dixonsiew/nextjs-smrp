'use client'

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Create from '../../create';
import DischargeOfficerService from '../../../../api/setup/discharge-officer';
import { Loading } from '../../../../../components/Loading';

const page = () => {
  const title = 'Discharge Officer Type';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    const b = await DischargeOfficerService.create(data);
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
