/*
  Warnings:

  - You are about to drop the column `LATEST_ID` on the `crm_borrowers` table. All the data in the column will be lost.
  - You are about to drop the `crm_clients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `crm_co_borrower` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sysdiagrams` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[crm_clients] DROP CONSTRAINT [crm_clients_areaID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[crm_clients] DROP CONSTRAINT [crm_clients_courseID_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[crm_clients] DROP CONSTRAINT [crm_clients_lastschoolId_fkey];

-- DropIndex
DROP INDEX [LATEST_ID] ON [dbo].[crm_borrowers];

-- DropIndex
DROP INDEX [LATEST_ID_2] ON [dbo].[crm_borrowers];

-- AlterTable
ALTER TABLE [dbo].[crm_borrowers] DROP COLUMN [LATEST_ID];

-- DropTable
DROP TABLE [dbo].[crm_clients];

-- DropTable
DROP TABLE [dbo].[crm_co_borrower];

-- DropTable
DROP TABLE [dbo].[sysdiagrams];

-- CreateTable
CREATE TABLE [dbo].[crm_client_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    [lastname] NVARCHAR(180) NOT NULL,
    [firstname] NVARCHAR(180) NOT NULL,
    [middlename] NVARCHAR(180) NOT NULL,
    [suffix] NVARCHAR(20),
    [birthday] NVARCHAR(45) NOT NULL,
    [age] NVARCHAR(45),
    [gender] NVARCHAR(45) NOT NULL,
    [email] NVARCHAR(145) NOT NULL,
    [facebook] NVARCHAR(145),
    [viber_skype] NVARCHAR(145),
    [civil_status] NVARCHAR(65) NOT NULL,
    [sss] NVARCHAR(45) NOT NULL,
    [tin] NVARCHAR(65) NOT NULL,
    [address_stay] NVARCHAR(255),
    [present_address] NVARCHAR(max) NOT NULL,
    [present_address_zipcode] NVARCHAR(255) NOT NULL,
    [present_address_stay] NVARCHAR(255) NOT NULL,
    [permanent_address] NVARCHAR(max) NOT NULL,
    [permanent_address_zipcode] NVARCHAR(255) NOT NULL,
    [permanent_address_stay] NVARCHAR(255) NOT NULL,
    [provincial_address] NVARCHAR(max) NOT NULL,
    [provincial_address_zipcode] NVARCHAR(255) NOT NULL,
    [provincial_address_stay] NVARCHAR(255) NOT NULL,
    [area] NVARCHAR(255) NOT NULL,
    [education] NVARCHAR(45) NOT NULL,
    [other_education] NVARCHAR(180) NOT NULL,
    [course] NVARCHAR(200) NOT NULL,
    [last_school] NVARCHAR(200),
    [mobile1] NVARCHAR(20) NOT NULL,
    [mobile2] NVARCHAR(20) NOT NULL,
    [mobile3] NVARCHAR(20) NOT NULL,
    [telephone1] NVARCHAR(20) NOT NULL,
    [telephone2] NVARCHAR(20) NOT NULL,
    [telephone3] NVARCHAR(20) NOT NULL,
    [roaming_no] NVARCHAR(20) NOT NULL,
    [source_of_income] NVARCHAR(max),
    [spouse_lastname] NVARCHAR(65) NOT NULL,
    [spouse_firstname] NVARCHAR(65) NOT NULL,
    [spouse_middlename] NVARCHAR(65) NOT NULL,
    [spouse_suffix] NVARCHAR(55) NOT NULL,
    [spouse_gender] NVARCHAR(6) NOT NULL,
    [spouse_birthday] NVARCHAR(65) NOT NULL,
    [spouse_age] NVARCHAR(25) NOT NULL,
    [spouse_mobile_no] NVARCHAR(255) NOT NULL,
    [spouse_tel_no] NVARCHAR(255) NOT NULL,
    [spouse_provincial_address] NVARCHAR(max) NOT NULL,
    [spouse_education] NVARCHAR(65) NOT NULL,
    [spouse_other_education] NVARCHAR(65) NOT NULL,
    [spouse_course] NVARCHAR(200) NOT NULL,
    [spouse_last_school] NVARCHAR(200) NOT NULL,
    [spouse_additional_information] NVARCHAR(255) NOT NULL,
    [spouse_year_graduated] NVARCHAR(65) NOT NULL,
    [spouse_source_of_income] NVARCHAR(max),
    [spouse_employment_details] NVARCHAR(255) NOT NULL,
    [spouse_employ_status] NVARCHAR(65) NOT NULL,
    [spouse_employer_business_address] NVARCHAR(max) NOT NULL,
    [spouse_employer_business_name] NVARCHAR(255) NOT NULL,
    [spouse_monthly_income] NVARCHAR(255) NOT NULL,
    [spouse_other_income] NVARCHAR(255),
    [spouse_dti_sec_reg] NVARCHAR(65) NOT NULL,
    [spouse_pro_license] NVARCHAR(65) NOT NULL,
    [spouse_sss] NVARCHAR(65) NOT NULL,
    [spouse_tin] NVARCHAR(65) NOT NULL,
    [spouse_prev_business_stay] NVARCHAR(65) NOT NULL,
    [spouse_prev_employer] NVARCHAR(65) NOT NULL,
    [spouse_prev_employer_business_address] NVARCHAR(max) NOT NULL,
    [spouse_business_contact] NVARCHAR(65) NOT NULL,
    [spouse_business_position] NVARCHAR(65) NOT NULL,
    [spouse_business_stay] NVARCHAR(65) NOT NULL,
    [father_name] NVARCHAR(max) NOT NULL,
    [father_age] NVARCHAR(25) NOT NULL,
    [mother_name] NVARCHAR(max) NOT NULL,
    [mother_age] NVARCHAR(25) NOT NULL,
    [home_owner] NVARCHAR(255) NOT NULL,
    [home_owner_rent] NVARCHAR(65) NOT NULL,
    [home_owner_free] NVARCHAR(45) NOT NULL,
    [residence_remarks] NVARCHAR(max) NOT NULL,
    [dti_sec_reg] NVARCHAR(255) NOT NULL,
    [pro_license] NVARCHAR(255) NOT NULL,
    [pi_remarks] NVARCHAR(max) NOT NULL,
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL,
    [siblings_name] NVARCHAR(45) NOT NULL,
    [siblings_age] NVARCHAR(45) NOT NULL,
    [siblings_type] NVARCHAR(45) NOT NULL,
    [siblings_school] NVARCHAR(45) NOT NULL,
    [Product] NVARCHAR(45) NOT NULL,
    CONSTRAINT [crm_client_test_profile_key] UNIQUE NONCLUSTERED ([profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_borrowers_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    [personal_loan] NVARCHAR(65) NOT NULL,
    [loan_terms] NVARCHAR(45) NOT NULL,
    [payment_mode] NVARCHAR(45) NOT NULL,
    [amount_applied] NVARCHAR(45) NOT NULL,
    [agent_type] NVARCHAR(45) NOT NULL,
    [lastname] NVARCHAR(180) NOT NULL,
    [firstname] NVARCHAR(180) NOT NULL,
    [middlename] NVARCHAR(180) NOT NULL,
    [suffix] NVARCHAR(20) NOT NULL,
    [birthday] NVARCHAR(45) NOT NULL,
    [age] NVARCHAR(45) NOT NULL,
    [mobile1] NVARCHAR(20) NOT NULL,
    [a_code1] NVARCHAR(20) NOT NULL,
    [telephone1] NVARCHAR(20) NOT NULL,
    [gender] NVARCHAR(180) NOT NULL,
    [civil_status] NVARCHAR(65) NOT NULL,
    [religion] NVARCHAR(45) NOT NULL,
    [email] NVARCHAR(145) NOT NULL,
    [maiden] NVARCHAR(180) NOT NULL,
    [last_school] NVARCHAR(200),
    [education] NVARCHAR(45) NOT NULL,
    [other_education] NVARCHAR(180) NOT NULL,
    [course] NVARCHAR(200) NOT NULL,
    [present_address_zipcode] NVARCHAR(255) NOT NULL,
    [present_address_stay] NVARCHAR(255) NOT NULL,
    [permanent_address] NVARCHAR(max) NOT NULL,
    [permanent_address_zipcode] NVARCHAR(255) NOT NULL,
    [permanent_address_stay] NVARCHAR(255) NOT NULL,
    [provincial_address] NVARCHAR(max) NOT NULL,
    [provincial_address_zipcode] NVARCHAR(255) NOT NULL,
    [provincial_address_stay] NVARCHAR(255) NOT NULL,
    [area] NVARCHAR(255) NOT NULL,
    [business_type] NVARCHAR(255) NOT NULL,
    [business_name] NVARCHAR(255) NOT NULL,
    [dti_sec_reg] NVARCHAR(255) NOT NULL,
    [business_address] NVARCHAR(255) NOT NULL,
    [business_stay] NVARCHAR(255) NOT NULL,
    [business_contact] NVARCHAR(255) NOT NULL,
    [tin] NVARCHAR(65) NOT NULL,
    [Reference] VARCHAR(60) NOT NULL,
    [Refer_address] VARCHAR(20) NOT NULL,
    [Refer_contact] VARCHAR(20) NOT NULL,
    [Refer_relation] VARCHAR(20) NOT NULL,
    [Reference1] VARCHAR(60) NOT NULL,
    [Refer_address1] VARCHAR(20) NOT NULL,
    [Refer_contact1] VARCHAR(20) NOT NULL,
    [Refer_relation1] VARCHAR(20) NOT NULL,
    CONSTRAINT [crm_borrowers_test_profile_key] UNIQUE NONCLUSTERED ([profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_loans_test] (
    [lid] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    [loan_profile] NVARCHAR(45) NOT NULL,
    [branch] NVARCHAR(65) NOT NULL,
    [assigned_ao] NVARCHAR(255) NOT NULL,
    [action_bm_name] NVARCHAR(255) NOT NULL,
    [agent] NVARCHAR(135) NOT NULL,
    [telemarketer] NVARCHAR(135) NOT NULL,
    [loan_type] NVARCHAR(135) NOT NULL,
    [prev_amount] NVARCHAR(65) NOT NULL,
    [prev_pn] NVARCHAR(65) NOT NULL,
    [payment_history] NVARCHAR(max) NOT NULL,
    [amount_applied] NVARCHAR(65) NOT NULL,
    [loan_terms] NVARCHAR(65) NOT NULL,
    [loan_purpose] NVARCHAR(45) NOT NULL,
    [loan_recommendation] NVARCHAR(45) NOT NULL,
    [crd_remarks] NVARCHAR(max) NOT NULL,
    [crecom_remarks] NVARCHAR(max) NOT NULL,
    [employer] NVARCHAR(65) NOT NULL,
    [employment] NVARCHAR(65) NOT NULL,
    [employment_status] NVARCHAR(65) NOT NULL,
    [nature_of_company] NVARCHAR(65) NOT NULL,
    [company_rank] NVARCHAR(65) NOT NULL,
    [contact_no] NVARCHAR(65) NOT NULL,
    [address] NVARCHAR(65) NOT NULL,
    [bussiness_existence] NVARCHAR(65) NOT NULL,
    [department] NVARCHAR(65) NOT NULL,
    [years_employed] NVARCHAR(65) NOT NULL,
    [status] NVARCHAR(65) NOT NULL,
    [position] NVARCHAR(65) NOT NULL,
    [salary_head] NVARCHAR(65) NOT NULL,
    [gross_salary] NVARCHAR(65) NOT NULL,
    [net_salary] NVARCHAR(65) NOT NULL,
    [informant] NVARCHAR(65) NOT NULL,
    [detail_position] NVARCHAR(65) NOT NULL,
    [detail_contact_no] NVARCHAR(65) NOT NULL,
    [detail_department] NVARCHAR(65) NOT NULL,
    [detail_remarks] NVARCHAR(65) NOT NULL,
    [total_expense] NVARCHAR(65) NOT NULL,
    [net_income] NVARCHAR(65) NOT NULL,
    [amortisation_rentals] NVARCHAR(65) NOT NULL,
    [make] NVARCHAR(65) NOT NULL,
    [variant] NVARCHAR(65) NOT NULL,
    [mv_file_no] NVARCHAR(65) NOT NULL,
    [plate_no] NVARCHAR(65) NOT NULL,
    [engine_no] NVARCHAR(65) NOT NULL,
    [chassis_no] NVARCHAR(65) NOT NULL,
    [wheel_class] NVARCHAR(65) NOT NULL,
    [year_model] NVARCHAR(65) NOT NULL,
    [v_reference] NVARCHAR(65) NOT NULL,
    [used_class] NVARCHAR(65) NOT NULL,
    [conduction_sticker] NVARCHAR(65) NOT NULL,
    [Year_Acquired] NVARCHAR(65) NOT NULL,
    [items_goods_loaded] NVARCHAR(65) NOT NULL,
    [crecom_val] NVARCHAR(65) NOT NULL,
    [ao_val] NVARCHAR(65) NOT NULL,
    [color] NVARCHAR(65) NOT NULL,
    [registered_in_lto] NVARCHAR(65) NOT NULL,
    [loanable_amount] NVARCHAR(65) NOT NULL,
    [percentage] NVARCHAR(65) NOT NULL,
    [accessories] NVARCHAR(65) NOT NULL,
    [agreed_price] NVARCHAR(65) NOT NULL,
    [engine_condition] NVARCHAR(65) NOT NULL,
    [body_condition] NVARCHAR(65) NOT NULL,
    [electrical_condition] NVARCHAR(65) NOT NULL,
    [transmission] NVARCHAR(65) NOT NULL,
    [air_conditioned] NVARCHAR(65) NOT NULL,
    [fuel] NVARCHAR(65) NOT NULL,
    [power_window] NVARCHAR(65) NOT NULL,
    [power_lock] NVARCHAR(65) NOT NULL,
    [power_side_mirror] NVARCHAR(65) NOT NULL,
    [power_steering] NVARCHAR(65) NOT NULL,
    [four_wheel_drive] NVARCHAR(65) NOT NULL,
    [remarks_road_test] NVARCHAR(65) NOT NULL,
    [company_agency] NVARCHAR(65) NOT NULL,
    [Position] NVARCHAR(65) NOT NULL,
    [start_date] NVARCHAR(65) NOT NULL,
    [end_date] NVARCHAR(65) NOT NULL,
    [bankBranch] NVARCHAR(65) NOT NULL,
    [telNumber] NVARCHAR(65) NOT NULL,
    [monthlyCredits] NVARCHAR(65) NOT NULL,
    [acctName] NVARCHAR(65) NOT NULL,
    [acctTypeNo] NVARCHAR(65) NOT NULL,
    [dateOpened] NVARCHAR(65) NOT NULL,
    [informantPosition] NVARCHAR(65) NOT NULL,
    [total] NVARCHAR(65) NOT NULL,
    [caseFiled] NVARCHAR(65) NOT NULL,
    [name] NVARCHAR(65) NOT NULL,
    [dateFiled] NVARCHAR(65) NOT NULL,
    [c_status] NVARCHAR(65) NOT NULL,
    [remarks] NVARCHAR(65) NOT NULL,
    [assests_make] NVARCHAR(65) NOT NULL,
    [yearModel] NVARCHAR(65) NOT NULL,
    [plateNo] NVARCHAR(65) NOT NULL,
    [bankFinancing] NVARCHAR(65) NOT NULL,
    [amortization] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(65) NOT NULL,
    [op_address] NVARCHAR(65) NOT NULL,
    [c_name] NVARCHAR(65) NOT NULL,
    [c_address] NVARCHAR(65) NOT NULL,
    [contactNo] NVARCHAR(65) NOT NULL,
    [relation] NVARCHAR(65) NOT NULL,
    [verified] NVARCHAR(65) NOT NULL,
    [nameOfInformant] NVARCHAR(65) NOT NULL,
    [bc_contactNo] NVARCHAR(65) NOT NULL,
    [positionInBarangay] NVARCHAR(65) NOT NULL,
    [directionRemarks] NVARCHAR(65) NOT NULL,
    [bc_remarks] NVARCHAR(65) NOT NULL,
    [nc_nameOfInformant] NVARCHAR(65) NOT NULL,
    [nc_contactNo] NVARCHAR(65) NOT NULL,
    [relationToBorrower] NVARCHAR(65) NOT NULL,
    [bc_directionRemarks] NVARCHAR(65) NOT NULL,
    [nc_remarks] NVARCHAR(65) NOT NULL,
    [lastname] NVARCHAR(65) NOT NULL,
    [firstname] NVARCHAR(65) NOT NULL,
    [middleName] NVARCHAR(65) NOT NULL,
    [suffix] NVARCHAR(65) NOT NULL,
    [co_relation] NVARCHAR(65) NOT NULL,
    [co_contactNo] NVARCHAR(65) NOT NULL,
    [birthDate] NVARCHAR(65) NOT NULL,
    [age] NVARCHAR(65) NOT NULL,
    [streetAddress] NVARCHAR(65) NOT NULL,
    [province] NVARCHAR(65) NOT NULL,
    [brgyMunicipalityCity] NVARCHAR(65) NOT NULL,
    [sourceOfIncome] NVARCHAR(65) NOT NULL,
    [otherInformation] NVARCHAR(65) NOT NULL,
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL,
    CONSTRAINT [crm_loans_test_pkey] PRIMARY KEY CLUSTERED ([lid])
);

-- CreateTable
CREATE TABLE [dbo].[crm_car_detail] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    CONSTRAINT [PK_crm_car_detail_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crm_business_type] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [REFE_CODE] NVARCHAR(255),
    [REFE_NAME] NVARCHAR(255),
    [_DELETED] INT NOT NULL,
    CONSTRAINT [PK_crm_business_type_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[crm_product] (
    [pid] INT NOT NULL IDENTITY(1,1),
    [product_name] VARCHAR(255),
    [product_type] VARCHAR(255),
    [cam] INT NOT NULL CONSTRAINT [DF__crm_product__cam__1C1D2798] DEFAULT 0,
    [active] VARCHAR(255),
    [company] VARCHAR(255),
    CONSTRAINT [PK_crm_product_pid] PRIMARY KEY CLUSTERED ([pid])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[crm_business_type]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[crm_business_type]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pid] ON [dbo].[crm_product]([pid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pid_2] ON [dbo].[crm_product]([pid]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
