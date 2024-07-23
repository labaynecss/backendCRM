export const mapLoanData = (loan: any) => ({
  id: loan.id,
  loanprofile: loan.loanprofile,
  profile: loan.profile,
  loantype: loan.loantype,
  terms: loan.terms,
  modeofpayment: loan.modeofpayment,
  amountapplied: loan.amountapplied,
  prevamount: loan.prevamount,
  previouspn: loan.previouspn,
  personal_loan: loan.personal_loan,
  paymenthistory: loan.paymenthistory,
  branchid: loan.branchid,
  productid: loan.productid,
  agentid: loan.agentid,
  areaid: loan.areaid,
  createdby: loan.createdby,
  createddatetime: loan.createddatetime,
  updatedby: loan.updatedby,
  updateddatetime: loan.updateddatetime,
  pres_address: loan.pres_address,
  pres_stay: loan.pres_stay,
});

export const flattenWorkInformation = (workInfo: { company: any; position: any; salary: any; startDate: any; endDate: any; }) => ({
  company: workInfo.company,
  position: workInfo.position,
  salary: workInfo.salary,
  startDate: workInfo.startDate,
  endDate: workInfo.endDate,
});

export const flattenSoi = (soi: any) => ({
  soiid: soi.soiid,
  sourcetype: soi.sourcetype,
  // Add other fields if necessary
});

export const flattenClientEducation = (education: any) => ({
  school_name: education?.crm_schools?.school_name || null,
  course_description: education?.crm_course?.course_description || null,
});

export const flattenProfileGet = (profileGet: any) => ({
  profile: profileGet.profile,
  lastname: profileGet.lastname,
  firstname: profileGet.firstname,
  middlename: profileGet.middlename,
  suffix: profileGet.suffix,
  birthday: profileGet.birthday,
  age: profileGet.age,
  gender: profileGet.gender,
  mobile: profileGet.mobile,
  telephone: profileGet.telephone,
  residence_status: profileGet.residence_status,
  perm_address: profileGet.perm_address,
  prov_stay: profileGet.prov_stay,
  prov_address: profileGet.prov_address,
  perm_stay: profileGet.perm_stay,
  area: profileGet.area,
  civilstatus: profileGet.civilstatus,
  religion: profileGet.religion,
  email: profileGet.email,
  mothersname: profileGet.mothersname,
  crm_spouse: profileGet.crm_spouse,
  crm_loan_hdr: profileGet.crm_loan_hdr.map(mapLoanData),
  crm_workInformation: profileGet.crm_workInformation.map(flattenWorkInformation),
  crm_soi: profileGet.crm_soi.map(flattenSoi),
  crm_clientFamily: profileGet.crm_clientFamily,
  crm_characterReference: profileGet.crm_loan_hdr.flatMap((loanHdr: { crm_characterReference: any; }) => loanHdr.crm_characterReference),
  clientEducation: profileGet.crm_clientEducation ? flattenClientEducation(profileGet.crm_clientEducation) : null,
});