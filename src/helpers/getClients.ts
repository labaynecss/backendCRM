export const ClientData = (client: any) => {
    const loan = client.crm_loan_hdr[0] || {
      amountapplied: null,
      crm_products: { prod_description: null },
      crm_branch: { branch_description: null },
    };
  
    return {
      profile: client.profile,
      lastname: client.lastname,
      firstname: client.firstname,
      middlename: client.middlename,
      branch_description: loan.crm_branch ? loan.crm_branch.branch_description : null,
      createddatetime: client.createddatetime,
      amountapplied: loan.amountapplied,
      prod_description: loan.crm_products ? loan.crm_products.prod_description : null,
    };
  };