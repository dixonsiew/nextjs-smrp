'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loading } from '../../../../../components/Loading';
import { ReportList } from '../../report-list';
import ReportService from '../../../../api/report/pd101';
import AppConstant from '../../../../../app/constants';
import Helper from '../../../../../utils/helper';
import download from 'downloadjs';
import useListStore from './listStore';

const page = () => {
  const title = 'PD101';
  const placeholderdateFrom = 'Admission From Date';
  const placeholderdateTo = 'Admission To Date';
  const pageSize = AppConstant.PAGE_SIZE;

  const router = useRouter();
  const listStore = useListStore();
  const [refresh, setRefresh] = useState(false);
  const [uiData, setUiData] = useState(() => {
    const o = {
      init: true,
      loading: false,
      downloading1: false,
      downloading2: false,
      list: [],
      columnmaps: [],
      totalCount: 0,
      totalPage: 0,
      dateFrom: null,
      dateTo: null,
      idateFrom: '',
      idateTo: '',
    }
    return o;
  })
  const [calendar, setCalendar] = useState({
    show: false,
    field: '',
    selected: ''
  });

  useEffect(() => {
    load();
  }, [refresh])

  const load = () => {
    loadPrevious();
    setTimeout(() => {
      window.scrollTo(listStore.getSx(), listStore.getSy());
    }, 200)
  }

  const loadPrevious = async () => {
    setUiData(prev => ({ ...prev, loading: true }));
    try {
      const response = await ReportService.listPrevious(listStore.getPage(), pageSize, '', '', uiData.idateFrom, uiData.idateTo);
      setUiData(prev => ({
        ...prev,
        init: false,
        loading: false,
        list: response.data,
        columnmaps: response.columnmaps,
        totalCount: response.total_count,
        totalPage: response.total_page,
        dateFrom: response.datefrom === 'null' ? new Date() : response.datefrom,
        dateTo: response.dateto === 'null' ? new Date() : response.dateto,
        idateFrom: response.datefrom === 'null' ? '' : response.datefrom,
        idateTo: response.dateto === 'null' ? '' : response.dateto
      }));
      return;
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, init: false, loading: false }));
    }
  }

  const onExportXlsx = async () => {
    try {
      setUiData(prev => ({ ...prev, downloading2: true }));
      const response = await ReportService.exportXlsx(uiData.idateFrom, uiData.idateTo);
      if (!response) {
        setUiData(prev => ({ ...prev, downloading2: false }));
        return;
      }

      const filename = response.headers['filename'];
      const data = response.data;
      download(data, filename);
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, downloading2: false }));
    }
  }

  const onExport = async () => {
    try {
      setUiData(prev => ({ ...prev, downloading1: true }));
      const response = await ReportService.exportJSON(uiData.idateFrom, uiData.idateTo);
      if (!response) {
        setUiData(prev => ({ ...prev, downloading1: false }));
        return;
      }

      const filename = response.headers['filename'];
      const data = response.data;
      download(data, filename);
    } catch (error) {

    } finally {
      setUiData(prev => ({ ...prev, downloading1: false }));
    }
  }

  const onApplyFilter = () => {

  }

  const onClearFilter = () => {
    setUiData(prev => ({ ...prev, dateFrom: null, dateTo: null, idateFrom: '', idateTo: '' }));
  }

  const onToday = () => {
    const date = new Date();
    setUiData(prev => ({ ...prev, dateFrom: date, dateTo: date, idateFrom: Helper.getDateStr(date), idateTo: Helper.getDateStr(date) }));
    return false;
  }

  const onYesterday = () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    setUiData(prev => ({ ...prev, dateFrom: date, dateTo: date, idateFrom: Helper.getDateStr(date), idateTo: Helper.getDateStr(date) }));
    return false;
  }

  const goto = (path) => {
    listStore.setScroll(window.scrollX, window.scrollY);
    router.push(`/main/report/master-pd101/${path}`);
  }

  const onEdit = (item) => {
    const s = `form/${item._id}`;
    goto(s);
  }

  const onPageChange = (page) => {
    listStore.setPage(page);
    listStore.setScroll(window.scrollX, window.scrollY);
    setRefresh(prev => !prev);
  }

  const onShowCalendar = (field) => {
    setCalendar(prev => ({
      ...prev,
      show: true,
      field,
      selected: field === 'from' ? uiData.idateFrom : uiData.idateTo
    }));
  }

  const onConfirmCalendar = (date) => {
    setCalendar(prev => ({
      ...prev,
      show: false
    }));
    const dt = Helper.getDateStr(date);
    if (calendar.field === 'from') {
      setUiData(prev => ({ ...prev, idateFrom: dt }));
    } else {
      setUiData(prev => ({ ...prev, idateTo: dt }));
    }
  }

  return (
    <>
      <Loading loading={uiData.loading} />
      <ReportList
        title={title}
        placeholderdateFrom={placeholderdateFrom}
        placeholderdateTo={placeholderdateTo}
        onChangeFrom={(e) => setUiData(prev => ({ ...prev, idateFrom: e.target.value }))}
        onChangeTo={(e) => setUiData(prev => ({ ...prev, idateTo: e.target.value }))}
        onShowCalendarFrom={() => onShowCalendar('from')}
        onShowCalendarTo={() => onShowCalendar('to')}
        onApplyFilter={onApplyFilter}
        onClearFilter={onClearFilter}
        onToday={onToday}
        onYesterday={onYesterday}
        onExport={onExport}
        onExportXlsx={onExportXlsx}
        onEdit={(item) => onEdit(item)}
        onPageChange={page => onPageChange(page)}
        uiData={uiData}
        listStore={listStore}
        onCancelCalendar={() => setCalendar(prev => ({ ...prev, show: false }))}
        onConfirmCalendar={(date) => onConfirmCalendar(date)}
        calendar={calendar}
      />
    </>
  )
}

export default page;
