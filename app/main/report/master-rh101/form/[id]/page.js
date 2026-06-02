'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReportService from '../../../../../api/report/rh101';
import LookupService from '../../../../../api/lookup';
import { CalendarModal } from '../../../../../../components/CalendarModal';
import { LookupModal } from '../../../../../../components/LookupModal';
import { Loading } from '../../../../../../components/Loading';
import { Helper } from '../../../../../../utils/helper';
import { schema } from '../../schema';

const page = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lookup, setLookup] = useState({
    title: '',
    show: false,
    field: '',
    items: [],
    selected: ''
  });
  const [calendar, setCalendar] = useState({
    show: false,
    field: '',
    selected: ''
  });
  const { id } = useParams();

  const [listData, setListData] = useState({
    ethnicgroup: [],
    personcategorycode: [],
    speciality: [],
    wardcls: [],
    referral: [],
    country: [],
    gender: [],
    religion: [],
    title: [],
    idtype: [],
    maritalstatus: [],
    relationship: [],
    city: [],
    state: [],
    admstatus: [],
    occupation: [],
    visittype: []
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange', // validates on change, blur, and submit
  })

  const title = 'RH101';

  useEffect(() => {
    if (id) {
      load()
    }
  }, [id])

  const load = async () => {
    setLoading(true);
    const [
      ethnicgroup,
      personcategorycode,
      speciality,
      wardcls,
      referral,
      country,
      gender,
      religion,
      title,
      idtype,
      maritalstatus,
      relationship,
      city,
      state,
      admstatus,
      occupation,
      visittype
    ] = await Promise.all([
      LookupService.listEthnicGroup(),
      LookupService.listPersonCategoryCode(),
      LookupService.listSpeciality(),
      LookupService.listWardClass(),
      LookupService.listReferral(),
      LookupService.listCountry(),
      LookupService.listGender(),
      LookupService.listReligion(),
      LookupService.listTitle(),
      LookupService.listIDType(),
      LookupService.listMaritalStatus(),
      LookupService.listRelationship(),
      LookupService.listCity(),
      LookupService.listState(),
      LookupService.listAdmStatus(),
      LookupService.listOccupation(),
      LookupService.listVisitTypes()
    ]);
    setListData(prev => ({
      ...prev,
      ethnicgroup,
      personcategorycode,
      speciality,
      wardcls,
      referral,
      country,
      gender,
      religion,
      title,
      idtype,
      maritalstatus,
      relationship,
      city,
      state,
      admstatus,
      occupation,
      visittype
    }));

    const response = await ReportService.edit(id);
    if (response) {
      setData(response);
      reset(response);
      setLoading(false);
    }
  }

  const onShowCalendar = (field) => {
    setCalendar(prev => ({
      ...prev,
      show: true,
      field,
      selected: getValues(field)
    }));
  }

  const onConfirmCalendar = (date) => {
    setCalendar(prev => ({
      ...prev,
      show: false
    }));
    const dt = Helper.getDateStr(date);
    setValue(calendar.field, dt);
  }

  const onShowLookup = (title, items, field) => {
    setLookup(prev => ({
      ...prev,
      title,
      show: true,
      field,
      items,
      selected: getValues(field)
    }));
  }

  const onConfirmLookup = (item) => {
    setLookup(prev => ({
      ...prev,
      show: false,
      selected: item.desc
    }));
    setValue(lookup.field, item.desc);
  }

  const formSubmit = async (data) => {
    const b = await ReportService.update(data._id, data);
    if (b) {
      toast.success('Data successfully updated');
    }
  }

  if (loading) {
    return <Loading />
  }

  return (
    <Container fluid className='p-6'>
      <div className="row mb-2">
        <div className="col-12">
          <h3 className="m-0 text-dark">Edit {title}</h3>
        </div>
      </div>
      <div>
        <form className="form-horizontal needs-validation" noValidate onSubmit={handleSubmit(formSubmit)}>
          <div className="row mb-2">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Visit</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ACCOUNT NO</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="ACCOUNT NO" readOnly={true}
                        className={`form-control ${errors.ACCOUNT_NO ? 'is-invalid' : ''}`}
                        {...register('ACCOUNT_NO')}
                      />
                      {errors.ACCOUNT_NO && <div className="invalid-feedback">{errors.ACCOUNT_NO.message}</div>}
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PRN</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="PRN" readOnly={true}
                        className={`form-control ${errors.PRN ? 'is-invalid' : ''}`}
                        {...register('PRN')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">REG DATE</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="REG DATE" readOnly={true}
                        className={`form-control ${errors.REGISTRATION_DATE ? 'is-invalid' : ''}`}
                        {...register('REGISTRATION_DATE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">REG TIME</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="REG TIME" readOnly={true}
                        className={`form-control ${errors.REGISTRATION_TIME ? 'is-invalid' : ''}`}
                        {...register('REGISTRATION_TIME')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Patient</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">TITLE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('TITLE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Title', listData.title, 'TITLE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NAME</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NAME"
                        className={`form-control ${errors.PATIENT_NAME ? 'is-invalid' : ''}`}
                        {...register('PATIENT_NAME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">GENDER</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('GENDER')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Gender', listData.gender, 'GENDER')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOB</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control"{...register('DOB')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('DOB')}>
                          <i className="fa fa-calendar-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">MARITAL STATUS</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('MARITAL_STATUS')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Marital Status', listData.maritalstatus, 'MARITAL_STATUS')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">RELIGION</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('RELIGION')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Religion', listData.religion, 'RELIGION')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NATIONALITY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Nationality', listData.country, 'NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">ETHNIC GROUP</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('ETHNIC_GROUP')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Ethnic Group', listData.ethnicgroup, 'ETHNIC_GROUP')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">HEIGHT</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="HEIGHT"
                        className={`form-control ${errors.HEIGHT ? 'is-invalid' : ''}`}
                        {...register('HEIGHT')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">WEIGHT</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="WEIGHT"
                        className={`form-control ${errors.WEIGHT ? 'is-invalid' : ''}`}
                        {...register('WEIGHT')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY OF BIRTH</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('COUNTRY_OF_BIRTH')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country of Birth', listData.country, 'COUNTRY_OF_BIRTH')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">PATIENT CATEGORY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('REFPERSONCATEGORYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Patient Category', listData.personcategorycode, 'REFPERSONCATEGORYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOC TYPE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('DOCUMENT_TYPE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Document Type', listData.idtype, 'DOCUMENT_TYPE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">DOC NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="DOC NO"
                        className={`form-control ${errors.DOCUMENT_NUMBER ? 'is-invalid' : ''}`}
                        {...register('DOCUMENT_NUMBER')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">HOME PHONE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="HOME PHONE"
                        className={`form-control ${errors.HOME_PHONE ? 'is-invalid' : ''}`}
                        {...register('HOME_PHONE')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Patient Address</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET1</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET1"
                        className={`form-control ${errors.STREET1 ? 'is-invalid' : ''}`}
                        {...register('STREET1')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET2</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET2"
                        className={`form-control ${errors.STREET2 ? 'is-invalid' : ''}`}
                        {...register('STREET2')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET3</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('CITYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Street3', listData.city, 'CITYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">POSTCODE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="POSTCODE"
                        className={`form-control ${errors.POSTCODE ? 'is-invalid' : ''}`}
                        {...register('POSTCODE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STATE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('OCITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('State', listData.state, 'OCITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country', listData.country, 'NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Next of Kin</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">RELATIONSHIP</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('RELATION_DESCRIPTION')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Relationship', listData.relationship, 'RELATION_DESCRIPTION')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK TITLE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK TITLE"
                        className={`form-control ${errors.NOK_TITLE ? 'is-invalid' : ''}`}
                        {...register('NOK_TITLE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK NAME</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK NAME"
                        className={`form-control ${errors.PATIENT_NOK_NAME ? 'is-invalid' : ''}`}
                        {...register('PATIENT_NOK_NAME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK DOC TYPE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NOK_ID_TYPE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('NOK Doc Type', listData.idtype, 'NOK_ID_TYPE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK DOC NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK DOC NO"
                        className={`form-control ${errors.NOK_ID ? 'is-invalid' : ''}`}
                        {...register('NOK_ID')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">NOK MOBILE NO</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="NOK MOBILE NO"
                        className={`form-control ${errors.NOK_MOBILE_PHONE ? 'is-invalid' : ''}`}
                        {...register('NOK_MOBILE_PHONE')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Next of Kin Address</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET1</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET1"
                        className={`form-control ${errors.NOK_STREET1 ? 'is-invalid' : ''}`}
                        {...register('NOK_STREET1')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET2</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="STREET2"
                        className={`form-control ${errors.NOK_STREET2 ? 'is-invalid' : ''}`}
                        {...register('NOK_STREET2')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STREET3</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NOK_CITYCODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Street3', listData.city, 'NOK_CITYCODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">POSTCODE</label>
                    <div className="col-sm-9">
                      <input type="text" placeholder="POSTCODE"
                        className={`form-control ${errors.NOK_POSTCODE ? 'is-invalid' : ''}`}
                        {...register('NOK_POSTCODE')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">STATE</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NOK_OCITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('State', listData.state, 'NOK_OCITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-3 col-form-label">COUNTRY</label>
                    <div className="col-sm-9">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('NOK_NATIONALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Country', listData.country, 'NOK_NATIONALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-0">Admission</h5>
                </div>
                <div className="card-body">
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ADMISSION DATE</label>
                    <div className="col-sm-4">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('ADMISSION_DATE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowCalendar('ADMISSION_DATE')}>
                          <i className="fa fa-calendar-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">ADMISSION TIME</label>
                    <div className="col-sm-4">
                      <input type="text" placeholder="ADMISSION TIME"
                        className={`form-control ${errors.ADMISSION_TIME ? 'is-invalid' : ''}`}
                        {...register('ADMISSION_TIME')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">WARD NO</label>
                    <div className="col-sm-10">
                      <input type="text" placeholder="WARD NO"
                        className={`form-control ${errors.WARD_NO ? 'is-invalid' : ''}`}
                        {...register('WARD_NO')}
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PRIMARY SPECIALITY</label>
                    <div className="col-sm-10">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('PRIMARY_SPECIALITY')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Primary Speciality', listData.speciality, 'PRIMARY_SPECIALITY')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <label className="col-sm-2 col-form-label">PAYMENT CLASS</label>
                    <div className="col-sm-10">
                      <div className="input-group">
                        <input type="text" className="form-control" {...register('PAYMENT_CLASS_CODE')} />
                        <button type="button" className="btn btn-outline-primary" onClick={() => onShowLookup('Payment Class', listData.wardcls, 'PAYMENT_CLASS_CODE')}>
                          <i className="fa fa-database"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-footer">
                  <button type="button" className="btn btn-outline-dark me-2" onClick={() => router.back()}><i className="fas fa-chevron-circle-left"></i> Back</button>
                  <button type="submit" className="btn btn-primary"><i className="fas fa-save"></i> Save</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      <CalendarModal
        onCancelCb={() => setCalendar(prev => ({ ...prev, show: false }))}
        onConfirm={(date) => onConfirmCalendar(date)}
        selected={calendar.selected}
        show={calendar.show}
      />
      <LookupModal
        onCancelCb={() => setLookup(prev => ({ ...prev, show: false }))}
        onConfirm={(item) => onConfirmLookup(item)}
        title={`Select ${lookup.title}`}
        items={lookup.items}
        selected={lookup.selected}
        show={lookup.show}
      />
    </Container>
  )
}

export default page;
