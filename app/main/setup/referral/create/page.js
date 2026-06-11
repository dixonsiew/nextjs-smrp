'use client'

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Create from '../../create';
import ReferralService from '../../../../api/setup/referral';
import { Loading } from '../../../../../components/Loading';

const page = () => {
  const title = 'Referral';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    const b = await ReferralService.create(data);
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
