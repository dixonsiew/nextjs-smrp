'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Create from '../../../create';
import CityService from '../../../../../api/setup/city';
import { Loading } from '../../../../../../components/Loading';

const page = () => {
  const title = 'City';
  const childRef = useRef();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const edit = !!id;

  useEffect(() => {
    if (id) {
      load();
    }
  }, [id])

  const load = async () => {
    setLoading(true);
    const response = await CityService.edit(id);
    if (response) {
      setData(response);
      setLoading(false);
    }
  }

  const formSubmit = async (data) => {
    const b = await CityService.update(id, data)
    if (b) {
      toast.success(`${title} successfully updated`);
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
