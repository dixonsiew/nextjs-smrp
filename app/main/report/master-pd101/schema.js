import * as yup from 'yup';

export const schema = yup.object({
  ACCOUNT_NO: yup.string().optional(),
  ADMISSION_DATE: yup.string().optional(),
  ADMISSION_STATUS: yup.string().optional(),
  ADMISSION_TIME: yup.string().optional(),
  CHARGE_CATEGORY_CODE: yup.string().optional(),

  CITYCODE: yup.string().optional(),
  CLUSTERFACILITYRN: yup.string().optional(),
  COUNTRY_OF_BIRTH: yup.string().optional(),
  DISCHARGEOFFICERS: yup.string().optional(),
  DISCHARGE_DATE: yup.string().optional(),

  DISCHARGE_DOCTOR: yup.string().optional(),
  DISCHARGE_REASON: yup.string().optional(),
  DISCHARGE_TIME: yup.string().optional(),
  DOB: yup.string().optional(),
  DOCUMENT_NUMBER: yup.string().optional(),

  DOCUMENT_TYPE: yup.string().optional(),
  ETHNIC_GROUP: yup.string().optional(),
  GENDER: yup.string().optional(),
  HEIGHT: yup.string().optional(),
  HOME_ADDRESS: yup.string().optional(),

  HOME_PHONE: yup.string().optional(),
  ISPOLICECASE: yup.string().optional(),
  LETTEROFGUARANTEE: yup.string().optional(),
  MARITAL_STATUS: yup.string().optional(),
  MCR_NO: yup.string().optional(),

  MOBILE_PHONE: yup.string().optional(),
  NATIONALITY: yup.string().optional(),
  NOK_HOME_ADDRESS: yup.string().optional(),
  NOK_HOME_PHONE: yup.string().optional(),
  NOK_ID: yup.string().optional(),

  NOK_ID_TYPE: yup.string().optional(),
  NOK_MOBILE_PHONE: yup.string().optional(),
  NOK_TITLE: yup.string().optional(),
  OCCUPATION: yup.string().optional(),
  OCITY: yup.string().optional(),

  PATIENT_NAME: yup.string().optional(),
  PATIENT_NOK_NAME: yup.string().optional(),
  PAYMENT_CLASS_CODE: yup.string().optional(),
  POSTCODE: yup.string().optional(),
  PRIMARY_SPECIALITY: yup.string().optional(),

  PRN: yup.string().optional(),
  REFERRAL: yup.string().optional(),
  REFFOREIGNRCOUNTRYCODE: yup.string().optional(),
  REFPERSONCATEGORYCODE: yup.string().optional(),
  REGISTRATION_DATE: yup.string().optional(),

  REGISTRATION_TIME: yup.string().optional(),
  RELATION_DESCRIPTION: yup.string().optional(),
  RELIGION: yup.string().optional(),
  STREET1: yup.string().optional(),
  STREET2: yup.string().optional(),

  TITLE: yup.string().optional(),
  VISIT_TYPE: yup.string().optional(),
  WARD_NO: yup.string().optional(),
  WEIGHT: yup.string().optional(),

  NOK_CITYCODE: yup.string().optional(),
  NOK_NATIONALITY: yup.string().optional(),
  NOK_OCITY: yup.string().optional(),
  NOK_POSTCODE: yup.string().optional(),
  NOK_STREET1: yup.string().optional(),
  NOK_STREET2: yup.string().optional()
}).required()