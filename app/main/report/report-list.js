
import { Container, ButtonGroup, DropdownButton, Dropdown, Spinner } from 'react-bootstrap';
import ResponsivePagination from 'react-responsive-pagination';
import { CalendarModal } from '../../../components/CalendarModal';

export const ReportList = ({ 
  title, 
  placeholderdateFrom, 
  placeholderdateTo, 
  onChangeFrom, 
  onChangeTo, 
  onShowCalendarFrom, 
  onShowCalendarTo, 
  onApplyFilter,
  onClearFilter, 
  onToday, 
  onYesterday,
  onExport,
  onExportXlsx,
  onEdit,
  onPageChange,
  uiData,
  listStore,
  onCancelCalendar,
  onConfirmCalendar,
  calendar
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
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-sm-3 col-12 p-1">
                <div className="input-group date">
                  <input type="text" className="form-control" placeholder={placeholderdateFrom} name="dateFrom"
                    value={uiData.idateFrom}
                    onChange={onChangeFrom}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={onShowCalendarFrom}>
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                </div>
              </div>
              <div className="col-sm-3 col-12 p-1">
                <div className="input-group date">
                  <input type="text" className="form-control" placeholder={placeholderdateTo} name="dateTo"
                    value={uiData.idateTo}
                    onChange={onChangeTo}
                  />
                  <button type="button" className="btn btn-outline-primary" onClick={onShowCalendarTo}>
                    <i className="fas fa-calendar-alt"></i>
                  </button>
                </div>
              </div>
              <div className="col-sm-1 col-12 p-1">
                <ButtonGroup>
                  <button type="button" className="btn btn-outline-primary" onClick={onClearFilter}>Clear</button>
                  <DropdownButton as={ButtonGroup}>
                    <Dropdown.Item href="#" onClick={onToday}>Today</Dropdown.Item>
                    <Dropdown.Item href="#" onClick={onYesterday}>Yesterday</Dropdown.Item>
                  </DropdownButton>
                </ButtonGroup>
              </div>
              <div className="col-sm-5 col-12 p-1 text-end">
                <button type="button" className="btn btn-primary me-2" onClick={onApplyFilter} disabled={uiData.dateFrom == null || uiData.dateTo == null}>Apply</button>
                {uiData.downloading1 && (
                <button type="button" className="btn btn-primary me-2" disabled>
                  <Spinner as="span" className="me-2" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span role="status">Downloading...</span>
                </button>
                )}
                <button type="button" className="btn btn-primary me-2" onClick={onExport}
                  hidden={uiData.downloading1}
                  disabled={uiData.list == null || uiData.list.length === 0 || uiData.downloading1}>JSON File</button>
                {uiData.downloading2 && (
                <button type="button" className="btn btn-primary" disabled>
                  <Spinner as="span" className="me-2" animation="border" size="sm" role="status" aria-hidden="true" />
                  <span role="status">Downloading...</span>
                </button>
                )}
                <button type="button" className="btn btn-primary" onClick={onExportXlsx}
                  hidden={uiData.downloading2}
                  disabled={uiData.list == null || uiData.list.length === 0 || uiData.downloading2}>Xlsx File</button>
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
                    <th></th>
                    {uiData.columnmaps.map((c, index) => (
                    <th key={index} className="text-nowrap">{c.text}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {uiData.list.map((item, index) => (
                  <tr key={index}>
                    <td className="text-nowrap">
                      <button type="button" className="btn btn-sm btn-primary" onClick={() => onEdit(item)}><i className="fas fa-pencil-alt"></i></button>
                    </td>
                    {uiData.columnmaps.map((c, index) => (
                    <td key={index} className="text-nowrap">
                      {item[c.field]}
                    </td>
                    ))}
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
      <CalendarModal
        onCancelCb={onCancelCalendar}
        onConfirm={onConfirmCalendar}
        selected={calendar.selected}
        show={calendar.show}
      />
    </Container>
  )
};

export default ReportList;
