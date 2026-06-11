'use client'

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Create from '../../../create';
import SpecialityService from '../../../../../api/setup/speciality';
import { Loading } from '../../../../../../components/Loading';

const page = () => {
  const title = 'Speciality';
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
    const response = await SpecialityService.edit(id);
    if (response) {
      setData(response);
      setLoading(false);
    }
  }

  const formSubmit = async (data) => {
    const b = await SpecialityService.update(id, data)
    if (b) {
      toast.success(`${title} successfully updated`);
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
