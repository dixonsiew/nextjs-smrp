'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../components/Loading';
import { List } from '../../list';
import SpecialityService from '../../../../api/setup/speciality';
import AppConstant from '../../../../constants';
import { useListStore } from './listStore';

const page = () => {
  const title = 'Speciality';
  const pageSize = AppConstant.PAGE_SIZE;

  const router = useRouter();
  const listStore = useListStore();
  const [refresh, setRefresh] = useState(false);
  const [uiData, setUiData] = useState(() => {
    const o = {
      init: true,
      loading: false,
      list: [],
      totalCount: 0,
      totalPage: 0,
    };
    return o;
  })
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: '',
    id: null
  });

  useEffect(() => {
    if (listStore.getSearch() !== '') {
      onSearch(listStore.getSearch());
    } else {
      load();
    }

    setTimeout(() => {
      window.scrollTo(listStore.getSx(), listStore.getSy())
    }, 200);
  }, [refresh])

  const load = async () => {
    setUiData(prev => ({ ...prev, loading: true }));
    try {
      const response = await SpecialityService.list(listStore.getPage(), pageSize, listStore.getSort(), listStore.getSortDir());
      setUiData(prev => ({
        ...prev,
        init: false,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE])
      }));
      return;
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, init: false, loading: false }));
    }
  }

  const onSearch = async (e) => {
    listStore.setSearch(e);
    listStore.setPage(1);
    setUiData(prev => ({ ...prev, loading: true }));
    try {
      const response = await SpecialityService.search(listStore.getPage(), pageSize, listStore.getSort(), listStore.getSortDir(), e);
      setUiData(prev => ({
        ...prev,
        init: false,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE]),
      }));
      listStore.setScroll(0, 0);
      setRefresh(prev => !prev);
      return
      // setTimeout(() => {
      //   window.scrollTo(uiData.sx, uiData.sy)
      //   localStorage.removeItem(uiState)
      // }, 200)
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, init: false, loading: false }));
      setRefresh(prev => !prev);
    }
  }

  const onSortBy = (e) => {
    if (e.sort === '' && e.dir === 'asc') {
      listStore.setSort('code', 'asc');
    } else {
      listStore.setSort(e.sort, e.dir);
    }

    listStore.setScroll(window.scrollX, window.scrollY);
    setRefresh(prev => !prev);
  }

  const goto = (path) => {
    listStore.setScroll(window.scrollX, window.scrollY);
    router.push(`/main/setup/speciality/${path}`);
  }

  const onEdit = (item) => {
    const s = `edit/${item.id}`;
    goto(s);
  }

  const onDelete = (item) => {
    setDeleteModal(prev => ({ ...prev, show: true, id: item.id, message: `Are you sure to delete this ${title} ${item.code} ?` }));
  }

  const onCancelDelete = () => {
    setDeleteModal(prev => ({ ...prev, show: false }));
  }

  const onConfirmDelete = async () => {
    const b = await SpecialityService.remove(deleteModal.id);
    if (b) {
      toast.success(`${title} successfully deleted`);
      setDeleteModal(prev => ({ ...prev, show: false }));
      setRefresh(prev => !prev);
    }
  }

  const onPageChange = (page) => {
    listStore.setPage(page);
    listStore.setScroll(window.scrollX, window.scrollY);
    setRefresh(prev => !prev);
  }

  return (
    <>
      <Loading loading={uiData.loading} />
      <List
        title={title}
        uiData={uiData}
        listStore={listStore}
        onSearch={onSearch}
        onCreate={() => goto('create')}
        onSortBy={onSortBy}
        onDelete={(item) => onDelete(item)}
        onEdit={(item) => onEdit(item)}
        onPageChange={page => onPageChange(page)}
        deleteModal={deleteModal}
        onCancelDelete={onCancelDelete}
        onConfirmDelete={onConfirmDelete}
      />
    </>
  )
}

export default page;
