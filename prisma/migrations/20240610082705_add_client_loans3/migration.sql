/*
  Warnings:

  - You are about to drop the column `a_code1` on the `crm_client` table. All the data in the column will be lost.
  - You are about to drop the column `civil_status` on the `crm_client` table. All the data in the column will be lost.
  - You are about to alter the column `source_of_income` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `spouse_provincial_address` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `spouse_source_of_income` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `spouse_employer_business_address` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `spouse_prev_employer_business_address` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `permanent_address` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - You are about to alter the column `provincial_address` on the `crm_client` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(Max)` to `NVarChar(1000)`.
  - Made the column `dateOpen` on table `crm_client` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[crm_client] DROP CONSTRAINT [crm_client_profile_key];

-- AlterTable
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [personal_loan] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [loan_terms] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [payment_mode] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [amount_applied] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [agent_type] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [branch] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [lastname] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [firstname] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [middlename] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [suffix] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [birthday] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [age] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [gender] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [mobile1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [telephone1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [religion] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [email] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [facebook] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [viber_skype] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [maiden] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [last_school] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [education] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [other_education] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [course] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [source_of_income] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_lastname] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_firstname] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_middlename] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_suffix] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_gender] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_birthday] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_age] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_mobile_no] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_tel_no] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_provincial_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_education] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_other_education] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_course] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_last_school] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_additional_information] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_year_graduated] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_source_of_income] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_employment_details] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_employ_status] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_employer_business_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_employer_business_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_monthly_income] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_other_income] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_dti_sec_reg] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_pro_license] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_sss] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_tin] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_prev_business_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_prev_employer] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_prev_employer_business_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_business_contact] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_business_position] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [spouse_business_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [present_address] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [present_address_zipcode] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [present_address_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [permanent_address] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [permanent_address_zipcode] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [permanent_address_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [provincial_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [provincial_address_zipcode] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [provincial_address_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [residence_status] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [area] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [business_type] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [business_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [dti_sec_reg] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [business_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [business_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [business_contact] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [tin] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [sss] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [position] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [compay_rank] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [reference] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_contact] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_relation] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [reference1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_address1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_contact1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [refer_relation1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [bank_branch] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [tel_no] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [account_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [account_type] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [dateOpen] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [informant_position] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [monthly_cred1] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [monthly_cred2] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [monthly_cred3] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [employer_business] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [employer_business_address] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [nature_business] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [length_business_stay] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [owned_rented] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [contact_number] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [monthly_income] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [date] DATETIME2 NOT NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [siblings_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [siblings_age] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [siblings_type] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [siblings_school] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [roaming_no] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [father_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [father_age] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [home_owner] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [home_owner_rent] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [home_owner_free] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [residence_remarks] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [pi_remarks] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [mother_name] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [mother_age] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [mobile3] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [telephone2] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] ALTER COLUMN [telephone3] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[crm_client] DROP COLUMN [a_code1],
[civil_status];
ALTER TABLE [dbo].[crm_client] ADD CONSTRAINT [crm_client_dateOpen_df] DEFAULT CURRENT_TIMESTAMP FOR [dateOpen], CONSTRAINT [crm_client_date_df] DEFAULT CURRENT_TIMESTAMP FOR [date];
ALTER TABLE [dbo].[crm_client] ADD [mobile2] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
