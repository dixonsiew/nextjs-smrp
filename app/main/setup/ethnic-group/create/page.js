'use client'

import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import Create from '../../create';
import EthnicGroupService from '../../../../api/setup/ethnic-group';
import { Loading } from '../../../../../components/Loading';

const page = () => {
  const title = 'Ethnic Group';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const formSubmit = async (data) => {
    const b = await EthnicGroupService.create(data);
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
