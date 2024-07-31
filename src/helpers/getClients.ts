export const ClientData = (client: any) => {
  const loan = client.crm_loan_hdr[0] || {
    amountapplied: null,
    crm_products: { prod_description: null },
    crm_branch: { branch_description: null },
  };

  const formatCurrency = (value: number | null) => {
    if (value === null) return null;
    return new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(value);
  };

  return {
    profile: client.profile,
    lastname: client.lastname,
    firstname: client.firstname,
    middlename: client.middlename,
    branch_description: loan.crm_branch ? loan.crm_branch.branch_description : null,
    createddatetime: client.createddatetime,
    amountapplied: formatCurrency(loan.amountapplied),
    prod_description: loan.crm_products ? loan.crm_products.prod_description : null,
  };
};
