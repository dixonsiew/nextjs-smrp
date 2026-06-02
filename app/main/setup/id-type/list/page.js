'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Loading } from '../../../../../components/Loading';
import { List } from '../../list';
import IdTypeService from '../../../../api/setup/id-type';
import AppConstant from '../../../../constants';

const page = () => {
  const uiState = 'setup.id-type.id-type-listing';
  const title = 'ID Type';
  const pageSize = AppConstant.PAGE_SIZE;

  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [uiData, setUiData] = useState(() => {
    const o = {
      loading: false,
      list: [],
      totalCount: 0,
      totalPage: 0,
      page: 1,
      search: '',
      sort: 'code',
      sortDir: 'asc',
      sx: 0,
      sy: 0
    };
    if (!localStorage) {
      return o;
    }

    const item = localStorage.getItem(uiState);
    if (item) {
      const parsed = JSON.parse(item);
      o.page = parsed.page;
      o.search = parsed.search;
      o.sort = parsed.sort;
      o.sortDir = parsed.sortDir;
      o.sx = parsed.sx;
      o.sy = parsed.sy;
    }
    return o;
  })
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    message: '',
    id: null
  });

  useEffect(() => {
    if (uiData.search !== '') {
      onSearch(uiData.search);
    } else {
      load();
    }

    setTimeout(() => {
      window.scrollTo(uiData.sx, uiData.sy)
    }, 200);
    localStorage.removeItem(uiState);
  }, [refresh])

  const load = async () => {
    setUiData(prev => ({ ...prev, loading: true }));
    try {
      const response = await IdTypeService.list(uiData.page, pageSize, uiData.sort, uiData.sortDir);
      setUiData(prev => ({
        ...prev,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE])
      }));
      return;
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, loading: false }));
    }
  }

  const onSearch = async (e) => {
    setUiData(prev => ({ ...prev, search: e, page: 1, loading: true }));
    try {
      const response = await IdTypeService.search(uiData.page, pageSize, uiData.sort, uiData.sortDir, e);
      setUiData(prev => ({
        ...prev,
        loading: false,
        list: response.data,
        totalCount: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_COUNT]),
        totalPage: Number(response.headers[AppConstant.HTTP_HEADER.X_TOTAL_PAGE]),
        sx: 0,
        sy: 0
      }));
      setRefresh(prev => !prev);
      return
      // setTimeout(() => {
      //   window.scrollTo(uiData.sx, uiData.sy)
      //   localStorage.removeItem(uiState)
      // }, 200)
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, loading: false }));
      setRefresh(prev => !prev);
    }
  }

  const onSortBy = (e) => {
    if (e.sort === '' && e.dir === 'asc') {
      setUiData(prev => ({ ...prev, sort: 'code', sortDir: 'asc' }));
    } else {
      setUiData(prev => ({ ...prev, sort: e.sort, sortDir: e.dir }));
    }

    setRefresh(prev => !prev);
  }

  const saveUIState = () => {
    const uiStateData = {
      page: uiData.page,
      search: uiData.search,
      sort: uiData.sort,
      sortDir: uiData.sortDir,
      sx: window.scrollX,
      sy: window.scrollY,
    }
    localStorage.setItem(uiState, JSON.stringify(uiStateData));
  }

  const goto = (path) => {
    saveUIState();
    router.push(`/main/setup/id-type/${path}`);
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
    const b = await IdTypeService.remove(deleteModal.id);
    if (b) {
      toast.success(`${title} successfully deleted`);
      setDeleteModal(prev => ({ ...prev, show: false }));
      setRefresh(prev => !prev);
    }
  }

  const onPageChange = (page) => {
    setUiData(prev => ({ ...prev, page, sx: window.scrollX, sy: window.scrollY }));
    setRefresh(prev => !prev);
  }

  if (uiData.loading) {
    return <Loading />
  }

  return <List
    title={title}
    uiData={uiData}
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
}

export default page;
