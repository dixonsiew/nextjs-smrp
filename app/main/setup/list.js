import { Container } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import { SearchInput } from '../../../components/SearchInput';
import { SortColumn } from '../../../components/SortColumn';
import { ConfirmModal } from '../../../components/ConfirmModal';

export const List = ({ 
  title, 
  uiData, 
  listStore,
  onSearch, 
  onCreate, 
  onSortBy, 
  onDelete, 
  onEdit, 
  onPageChange, 
  deleteModal, 
  onCancelDelete, 
  onConfirmDelete 
}) => {
  if (uiData.init) {
    return <></>
  }

  return (
    <Container fluid className='p-6'>
      <div className="row mb-2">
        <div className="col-12">
          <h3 className="m-0 text-dark">{title} Listing</h3>
        </div>
      </div>
      <div>
        <div className="card mb-2">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-6 col-12 p-1">
                <SearchInput msearch={listStore.getSearch()} onSearch={onSearch} />
              </div>
              <div className="col-sm-6 col-12 p-1 text-end">
                <button type="button" className="btn btn-primary" onClick={onCreate}>
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
                        <SortColumn name={'VESALIUS Description'} sort={'desc'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                      </th>
                      <th style={{ width: '150px' }}>
                        <SortColumn name={'SMRP Code'} sort={'code'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                      </th>
                      <th>
                        <SortColumn name={'Reference'} sort={'ref'} dir={listStore.getSortDir()} current={listStore.getSort()} onSortBy={onSortBy} />
                      </th>
                      <th style={{ width: '90px' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {uiData.list.map((item, index) => (
                      <tr key={index}>
                        <td>{item.desc}</td>
                        <td>{item.code}</td>
                        <td>{item.ref}</td>
                        <td>
                          <button type="button" className="btn btn-sm btn-primary me-2" onClick={() => onEdit(item)}>
                            <i className="fas fa-pencil-alt"></i>
                          </button>
                          <button type="button" className="btn btn-sm btn-danger" onClick={() => onDelete(item)}>
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
  )
}

export default List;
