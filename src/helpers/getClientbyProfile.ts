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
  agentType: loan.agent_type,
  createdby: loan.createdby,
  createddatetime: loan.createddatetime,
  updatedby: loan.updatedby,
  updateddatetime: loan.updateddatetime,
  pres_address: loan.pres_address,
  pres_stay: loan.pres_stay,
  pres_brgycode: loan.pres_brgycode,
  crm_loanStatusReport: loan.crm_loanStatusReport,
});

export const flattenSoi = (soi: any) => ({
  soiid: soi.soiid,
  sourcetype: soi.sourcetype,
  monthlyincome: soi.monthlyincome,
  otherincome: soi.otherincome,
});

export const flattenClientEducation = (education: any) => ({
  educ_level: education?.educ_level,
  school_name: education?.crm_schools?.school_name || null,
  course_description: education?.crm_course?.course_description || null,
  course_id: education?.crm_course?.course_id || null,
});

export const flattenProfileGet = (profileGet: any) => {
  return {
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
    perm_brgycode: profileGet.perm_brgycode,
    prov_stay: profileGet.prov_stay,
    prov_address: profileGet.prov_address,
    perm_stay: profileGet.perm_stay,
    area: profileGet.area,
    acode: profileGet.acode,
    civilstatus: profileGet.civilstatus,
    religion: profileGet.religion,
    email: profileGet.email,
    mothersname: profileGet.mothersname,
    crm_clientSocials: profileGet.crm_clientSocials,
    crm_spouse: profileGet.crm_spouse,
    crm_assetsAuto: profileGet.crm_assetsAuto,

    crm_loan_hdr: profileGet.crm_loan_hdr.map(mapLoanData),
    crm_workInformation: profileGet.crm_loan_hdr.flatMap(
      (loanHdr: { crm_workInformation: any }) => loanHdr.crm_workInformation
    ),
    crm_soi: profileGet.crm_soi.map(flattenSoi),
    crm_clientFamily: profileGet.crm_clientFamily,
    crm_characterReference: profileGet.crm_loan_hdr.flatMap(
      (loanHdr: { crm_characterReference: any }) =>
        loanHdr.crm_characterReference
    ),
    crm_clientEducation: profileGet.crm_clientEducation
      ? flattenClientEducation(profileGet.crm_clientEducation)
      : null,
    crm_address_barangay: profileGet.crm_loan_hdr.flatMap(
      (loanHdr: { crm_address_barangay: any }) => loanHdr.crm_address_barangay
    ),
    crm_branch: profileGet.crm_loan_hdr.flatMap(
      (loanHdr: { crm_branch: any }) => loanHdr.crm_branch
    ), // Assuming a relation or processing path exists here
  };
};
