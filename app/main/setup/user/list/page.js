'use client'

import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { DateTime } from "luxon";
import { Loading } from '../../../../../components/Loading';
import { SearchInput } from '../../../../../components/SearchInput';
import { SortColumn } from '../../../../../components/SortColumn';
import { ConfirmModal } from '../../../../../components/ConfirmModal';
import UserService from '../../../../api/setup/user';
import AppConstant from '../../../../constants';
import { useListStore } from './listStore';

const page = () => {
  const title = 'User';
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
      const response = await UserService.list(listStore.getPage(), pageSize, listStore.getSort(), listStore.getSortDir());
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
      const response = await UserService.search(listStore.getPage(), pageSize, listStore.getSort(), listStore.getSortDir(), e);
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
      listStore.setSort('username', 'asc');
    } else {
      listStore.setSort(e.sort, e.dir);
    }

    listStore.setScroll(window.scrollX, window.scrollY);
    setRefresh(prev => !prev);
  }

  const goto = (path) => {
    listStore.setScroll(window.scrollX, window.scrollY);
    router.push(`/main/setup/user/${path}`);
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
    const b = await UserService.remove(deleteModal.id);
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

  const getUserRoles = (item) => {
    const ls = item.roles || [];
    const lr = ls.map(role => role.name);
    return lr.join(', ');
  }

  if (uiData.init) {
    return <></>
  }

  return (
    <>
      <Loading loading={uiData.loading} />
      <Container fluid className='p-6'>
        <div className="row mb-2">
          <div className="col-12">
            <h3 className="m-0 text-dark">{title} Listing</h3>
          </div>
        </div>
        <div>
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-sm-6 col-12 p-1">
                  <SearchInput msearch={listStore.getSearch()} onSearch={onSearch} />
                </div>
                <div className="col-sm-6 col-12 p-1 text-end">
                  <button type="button" className="btn btn-primary" onClick={() => goto('create')}>
                    <i className="fas fa-plus"></i> Add New
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              {uiData.list && uiData.list.length === 0 && !uiData.loading && (
                <div className="text-center">
                  <h4>No records found</h4>
                </div>
              )}
              {uiData.list && uiData.list.length > 0 && !uiData.loading && (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover table-sm">
                    <thead>
                      <tr>
                        <th>
                          <SortColumn name={'Username'} sort={'username'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                        </th>
                        <th>
                          <SortColumn name={'First name'} sort={'first_name'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                        </th>
                        <th>
                          <SortColumn name={'Last name'} sort={'last_name'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                        </th>
                        <th>
                          <SortColumn name={'Last Login'} sort={'last_login'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                        </th>
                        <th>Role</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {uiData.list.map((item, index) => (
                        <tr key={index}>
                          <td>{item.username}</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.last_login ? DateTime.fromISO(item.last_login).toFormat('yyyy-MM-dd hh:mm:ss a') : ''}</td>
                          <td>{getUserRoles(item)}</td>
                          <td>
                            <button type="button" className="btn btn-sm btn-primary me-2" onClick={() => onEdit(item)}>
                              <i className="fas fa-pencil-alt"></i>
                            </button>
                            <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => onDelete(item)}>
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            {uiData.totalCount > 0 && (
              <div className={`card-footer ${uiData.loading ? 'd-none' : ''}`}>
                <div className="float-start pg-label">
                  Page {listStore.getPage()} / {uiData.totalPage} of {uiData.totalCount} record(s)
                </div>
                <div className="float-end">
                  <ResponsivePagination
                    total={uiData.totalPage}
                    current={listStore.getPage()}
                    onPageChange={page => onPageChange(page)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <ConfirmModal
          show={deleteModal.show}
          title={`Delete ${title}`}
          message={deleteModal.message}
          onCancel={() => onCancelDelete()}
          onConfirm={() => onConfirmDelete()}
        />
      </Container>
    </>
  )
}

export default page;
