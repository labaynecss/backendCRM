BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[users] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [USERNAME] NVARCHAR(30),
    [_PASSWORD] NVARCHAR(64),
    [_SALT] NVARCHAR(3) NOT NULL,
    [VOICELINK] NVARCHAR(125) NOT NULL,
    [_AVATAR] NVARCHAR(max) NOT NULL,
    [FIRSTNAME] NVARCHAR(100),
    [LASTNAME] NVARCHAR(100),
    [COMETNAME] NVARCHAR(125) NOT NULL,
    [EMAIL] NVARCHAR(100),
    [_ADDRESS] NVARCHAR(255),
    [_TELECOM] NVARCHAR(30),
    [MOBILE] NVARCHAR(100),
    [_BIRTHDATE] NVARCHAR(100),
    [_CIVILSTATUS] NVARCHAR(100),
    [_AGE] NVARCHAR(2),
    [_CITY] NVARCHAR(100),
    [_AREA] NVARCHAR(100),
    [_PROVINCE] NVARCHAR(100),
    [_COUNTRY] NVARCHAR(100),
    [_LEVEL] INT,
    [_SECONDLEVEL] INT NOT NULL,
    [_GROUPE] NVARCHAR(50),
    [BRANCH] NVARCHAR(max) NOT NULL,
    [_REGDATE] NVARCHAR(100),
    [_LOGGED] INT,
    [LASTLOGIN] NVARCHAR(50),
    [LASTLOGOUT] NVARCHAR(50),
    [_LASTACTIVITY] INT NOT NULL,
    [_USESMS] INT,
    [_SESSION] NVARCHAR(100),
    [_SESSIONDATA] NVARCHAR(255),
    [_DELETED] NVARCHAR(1) NOT NULL CONSTRAINT [DF__users___DELETED__3414ACBA] DEFAULT 'N''0''',
    [_ACTIVATION] NVARCHAR(255),
    [SYNC] INT NOT NULL CONSTRAINT [DF__users__SYNC__35FCF52C] DEFAULT 0,
    [USER_ID_NUMBER] NVARCHAR(60) NOT NULL CONSTRAINT [DF__users__USER_ID_N__36F11965] DEFAULT 'N''0''',
    CONSTRAINT [PK_users_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[branch] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [BRANCH] NVARCHAR(45) NOT NULL,
    [AREA] NVARCHAR(45) NOT NULL CONSTRAINT [DF__branch__AREA__4C364F0E] DEFAULT 'N''0''',
    [INFO] NVARCHAR(45) NOT NULL,
    [_OWNER] NVARCHAR(45) NOT NULL,
    [_DELETED] INT NOT NULL,
    [_DATE] DATETIME NOT NULL CONSTRAINT [DF__branch___DATE__4D2A7347] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_branch_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[areas] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ZONE_AREACODE] NVARCHAR(255) NOT NULL,
    [AREA] NVARCHAR(255),
    [_DELETED] INT CONSTRAINT [DF__areas___DELETED__3A179ED3] DEFAULT 0,
    CONSTRAINT [PK_areas_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[crm_client] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(1000) NOT NULL,
    [personal_loan] NVARCHAR(65) NOT NULL,
    [loan_terms] NVARCHAR(45) NOT NULL,
    [payment_mode] NVARCHAR(45) NOT NULL,
    [amount_applied] NVARCHAR(45) NOT NULL,
    [agent_type] NVARCHAR(45) NOT NULL,
    [branch] NVARCHAR(45) NOT NULL,
    [lastname] NVARCHAR(180) NOT NULL,
    [firstname] NVARCHAR(180) NOT NULL,
    [middlename] NVARCHAR(180) NOT NULL,
    [suffix] NVARCHAR(20),
    [birthday] NVARCHAR(45) NOT NULL,
    [age] NVARCHAR(45) NOT NULL,
    [gender] NVARCHAR(180) NOT NULL,
    [mobile1] NVARCHAR(20) NOT NULL,
    [a_code1] NVARCHAR(20),
    [telephone1] NVARCHAR(20),
    [civil_status] NVARCHAR(65) NOT NULL,
    [religion] NVARCHAR(45) NOT NULL,
    [email] NVARCHAR(145) NOT NULL,
    [facebook] NVARCHAR(145) NOT NULL,
    [viber_skype] NVARCHAR(145) NOT NULL,
    [maiden] NVARCHAR(180) NOT NULL,
    [last_school] NVARCHAR(200),
    [education] NVARCHAR(45) NOT NULL,
    [other_education] NVARCHAR(180) NOT NULL,
    [course] NVARCHAR(200) NOT NULL,
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
    [present_address] NVARCHAR(255) NOT NULL,
    [present_address_zipcode] NVARCHAR(255) NOT NULL,
    [present_address_stay] NVARCHAR(255) NOT NULL,
    [permanent_address] NVARCHAR(max) NOT NULL,
    [permanent_address_zipcode] NVARCHAR(255) NOT NULL,
    [permanent_address_stay] NVARCHAR(255) NOT NULL,
    [provincial_address] NVARCHAR(max) NOT NULL,
    [provincial_address_zipcode] NVARCHAR(255) NOT NULL,
    [provincial_address_stay] NVARCHAR(255) NOT NULL,
    [residence_status] NVARCHAR(255) NOT NULL,
    [area] NVARCHAR(255) NOT NULL,
    [business_type] NVARCHAR(255) NOT NULL,
    [business_name] NVARCHAR(255) NOT NULL,
    [dti_sec_reg] NVARCHAR(255) NOT NULL,
    [business_address] NVARCHAR(255) NOT NULL,
    [business_stay] NVARCHAR(255) NOT NULL,
    [business_contact] NVARCHAR(255) NOT NULL,
    [tin] NVARCHAR(65) NOT NULL,
    [sss] NVARCHAR(65) NOT NULL,
    [position] NVARCHAR(65) NOT NULL,
    [compay_rank] NVARCHAR(255),
    [reference] VARCHAR(60),
    [refer_address] VARCHAR(70) NOT NULL,
    [refer_contact] VARCHAR(70) NOT NULL,
    [refer_relation] VARCHAR(70) NOT NULL,
    [reference1] VARCHAR(60) NOT NULL,
    [refer_address1] VARCHAR(70) NOT NULL,
    [refer_contact1] VARCHAR(70) NOT NULL,
    [refer_relation1] VARCHAR(70) NOT NULL,
    [bank_branch] NVARCHAR(255),
    [tel_no] NVARCHAR(255),
    [account_name] NVARCHAR(255),
    [account_type] NVARCHAR(255),
    [dateOpen] DATETIME,
    [informant_position] NVARCHAR(255),
    [monthly_cred1] NVARCHAR(255),
    [monthly_cred2] NVARCHAR(255),
    [monthly_cred3] NVARCHAR(255),
    [employer_business] NVARCHAR(255),
    [employer_business_address] NVARCHAR(255),
    [nature_business] NVARCHAR(255),
    [length_business_stay] NVARCHAR(255),
    [owned_rented] NVARCHAR(255),
    [contact_number] NVARCHAR(255),
    [monthly_income] NVARCHAR(255),
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL,
    [siblings_name] NVARCHAR(45) NOT NULL,
    [siblings_age] NVARCHAR(45) NOT NULL,
    [siblings_type] NVARCHAR(45) NOT NULL,
    [siblings_school] NVARCHAR(45) NOT NULL,
    [roaming_no] NVARCHAR(45) NOT NULL,
    [father_name] NVARCHAR(70) NOT NULL,
    [father_age] NVARCHAR NOT NULL,
    [home_owner] NVARCHAR(70) NOT NULL,
    [home_owner_rent] NVARCHAR(70) NOT NULL,
    [home_owner_free] NVARCHAR(70) NOT NULL,
    [residence_remarks] NVARCHAR(70) NOT NULL,
    [pi_remarks] NVARCHAR(70) NOT NULL,
    [mother_name] NVARCHAR(70) NOT NULL,
    [mother_age] NVARCHAR(70) NOT NULL,
    [mobile3] NVARCHAR(45) NOT NULL,
    [telephone2] NVARCHAR(45) NOT NULL,
    [telephone3] NVARCHAR(45) NOT NULL,
    CONSTRAINT [crm_client_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [crm_client_profile_key] UNIQUE NONCLUSTERED ([profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_product_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [clientId] INT NOT NULL,
    [profile] NVARCHAR(1000) NOT NULL,
    [company] NVARCHAR(45) NOT NULL,
    [product_name] NVARCHAR(45) NOT NULL,
    [soi] NVARCHAR(65) NOT NULL,
    CONSTRAINT [crm_product_test_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [crm_product_test_profile_key] UNIQUE NONCLUSTERED ([profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_loans_test] (
    [lid] INT NOT NULL IDENTITY(1,1),
    [clientId] INT NOT NULL,
    [profile] NVARCHAR(1000) NOT NULL,
    [loan_profile] NVARCHAR(1000) NOT NULL,
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
    [soiID] INT NOT NULL,
    [employer] NVARCHAR(65) NOT NULL,
    [employment] NVARCHAR(65) NOT NULL,
    [employment_status] NVARCHAR(65) NOT NULL,
    [nature_of_company] NVARCHAR(65) NOT NULL,
    [company_rank] NVARCHAR(65) NOT NULL,
    [contact_no] NVARCHAR(65) NOT NULL,
    [address] NVARCHAR(65) NOT NULL,
    [business_existence] NVARCHAR(65) NOT NULL,
    [department] NVARCHAR(65) NOT NULL,
    [years_employed] NVARCHAR(65) NOT NULL,
    [status] NVARCHAR(65) NOT NULL,
    [employment_position] NVARCHAR(65) NOT NULL,
    [salary_head] NVARCHAR(65) NOT NULL,
    [gross_salary] NVARCHAR(65) NOT NULL,
    [net_salary] NVARCHAR(65) NOT NULL,
    [informant] NVARCHAR(65) NOT NULL,
    [detail_position] NVARCHAR(65) NOT NULL,
    [detail_contact_no] NVARCHAR(65) NOT NULL,
    [detail_department] NVARCHAR(65) NOT NULL,
    [detail_remarks] NVARCHAR(65) NOT NULL,
    [salary] NVARCHAR(65),
    [other_income] NVARCHAR(65),
    [total_income] NVARCHAR(65),
    [amortisation_rentals] NVARCHAR(65),
    [food] NVARCHAR(65),
    [elecric] NVARCHAR(65),
    [education] NVARCHAR(65),
    [others] NVARCHAR(65),
    [total_expense] NVARCHAR(65),
    [net_income] NVARCHAR(65),
    [net_disposal_income] NVARCHAR(65),
    [approximate_amort] NVARCHAR(65),
    [make] NVARCHAR(65) NOT NULL,
    [variant] NVARCHAR(65) NOT NULL,
    [mv_file_no] NVARCHAR(65) NOT NULL,
    [plate_no] NVARCHAR(65) NOT NULL,
    [engine_no] NVARCHAR(65) NOT NULL,
    [chassis_no] NVARCHAR(65) NOT NULL,
    [wheel_class] NVARCHAR(65),
    [year_model] NVARCHAR(65) NOT NULL,
    [v_reference] NVARCHAR(65),
    [used_class] NVARCHAR(65),
    [conduction_sticker] NVARCHAR(65) NOT NULL,
    [year_acquired] NVARCHAR(65),
    [items_goods_loaded] NVARCHAR(65),
    [crecom_valuation] NVARCHAR(65),
    [ao_valuation] NVARCHAR(65),
    [loaded_weight] NVARCHAR(65),
    [color] NVARCHAR(65) NOT NULL,
    [mileage] NVARCHAR(65) NOT NULL,
    [registered_in_lto] NVARCHAR(65),
    [loanable_amount] NVARCHAR(65),
    [percentage] NVARCHAR(65),
    [accessories] NVARCHAR(65) NOT NULL,
    [agreed_price] NVARCHAR(65),
    [engine_condition] NVARCHAR(65) NOT NULL,
    [body_condition] NVARCHAR(65) NOT NULL,
    [electrical_condition] NVARCHAR(65) NOT NULL,
    [transmission_fule] NVARCHAR(65) NOT NULL,
    [air_conditioned] NVARCHAR(65) NOT NULL,
    [fuel] NVARCHAR(65) NOT NULL,
    [power_window] NVARCHAR(65) NOT NULL,
    [power_lock] NVARCHAR(65) NOT NULL,
    [power_side_mirror] NVARCHAR(65) NOT NULL,
    [power_steering] NVARCHAR(65) NOT NULL,
    [four_wheel_drive] NVARCHAR(65) NOT NULL,
    [remarks_road_test] NVARCHAR(65) NOT NULL,
    [company_agency] NVARCHAR(65),
    [e_position] NVARCHAR(65),
    [start_date] NVARCHAR(65),
    [end_date] NVARCHAR(65),
    [bankBranch] NVARCHAR(65),
    [telNumber] NVARCHAR(65),
    [monthlyCredits] NVARCHAR(65),
    [acctName] NVARCHAR(65),
    [acctTypeNo] NVARCHAR(65),
    [dateOpened] NVARCHAR(65),
    [informantPosition] NVARCHAR(65),
    [total] NVARCHAR(65),
    [caseFiled] NVARCHAR(65),
    [name] NVARCHAR(65),
    [dateFiled] NVARCHAR(65),
    [c_status] NVARCHAR(65),
    [remarks] NVARCHAR(65),
    [assets_make] NVARCHAR(65),
    [yearModel] NVARCHAR(65),
    [plateNo] NVARCHAR(65),
    [bankFinancing] NVARCHAR(65),
    [amortization] NVARCHAR(1000),
    [other_properties] NVARCHAR(65),
    [type] NVARCHAR(65),
    [op_address] NVARCHAR(65),
    [c_name] NVARCHAR(65) NOT NULL,
    [c_address] NVARCHAR(65) NOT NULL,
    [contactNo] NVARCHAR(65) NOT NULL,
    [relation] NVARCHAR(65) NOT NULL,
    [verified] NVARCHAR(65) NOT NULL,
    [nameOfInformant] NVARCHAR(65),
    [bc_contactNo] NVARCHAR(65),
    [positionInBarangay] NVARCHAR(65),
    [directionRemarks] NVARCHAR(65),
    [bc_remarks] NVARCHAR(65),
    [nc_nameOfInformant] NVARCHAR(65),
    [nc_contactNo] NVARCHAR(65),
    [relationToBorrower] NVARCHAR(65),
    [bc_directionRemarks] NVARCHAR(65),
    [nc_remarks] NVARCHAR(65),
    [lastname] NVARCHAR(65),
    [firstname] NVARCHAR(65),
    [middleName] NVARCHAR(65),
    [suffix] NVARCHAR(65),
    [co_relation] NVARCHAR(65),
    [co_contactNo] NVARCHAR(65),
    [birthDate] NVARCHAR(65),
    [age] NVARCHAR(65),
    [streetAddress] NVARCHAR(65),
    [province] NVARCHAR(65),
    [brgyMunicipalityCity] NVARCHAR(65),
    [sourceOfIncome] NVARCHAR(65),
    [otherInformation] NVARCHAR(65),
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL,
    CONSTRAINT [crm_loans_test_pkey] PRIMARY KEY CLUSTERED ([lid]),
    CONSTRAINT [crm_loans_test_profile_key] UNIQUE NONCLUSTERED ([profile]),
    CONSTRAINT [crm_loans_test_loan_profile_key] UNIQUE NONCLUSTERED ([loan_profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_soi_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [loan_profile] NVARCHAR(1000) NOT NULL,
    [employer] NVARCHAR(255) NOT NULL,
    [nature_of_company] NVARCHAR(255),
    [yrs_in_operation] NVARCHAR(255),
    [rent_expense_lessor] NVARCHAR(255),
    [nature_of_clinic] NVARCHAR(255),
    [other_nature_clinic] NVARCHAR(255),
    [specialization] NVARCHAR(255),
    [other_specialization] NVARCHAR(255),
    [prc_no] NVARCHAR(255),
    [ave_patient_per_day] NVARCHAR(255),
    [ave_rate_per_patient] NVARCHAR(255),
    [ave_monthly_income] NVARCHAR(255),
    [other_clinic_affil] NVARCHAR(255),
    [contact_no] NVARCHAR(255),
    [company_rank] NVARCHAR(255),
    [company_existence] NVARCHAR(255),
    [address] NVARCHAR(255),
    [bussiness_existence] NVARCHAR(255),
    [existance] NVARCHAR(255),
    [department] NVARCHAR(255),
    [years_employed] NVARCHAR(255),
    [status] NVARCHAR(255),
    [position] NVARCHAR(255),
    [rank] NVARCHAR(255),
    [category] NVARCHAR(255),
    [gross_salary] NVARCHAR(255),
    [net_salary] NVARCHAR(255),
    [dov_informant] NVARCHAR(255),
    [dov_position] NVARCHAR(255),
    [dov_contact_no] NVARCHAR(255),
    [dov_department] NVARCHAR(255),
    [dov_remarks] NVARCHAR(255),
    [agency] NVARCHAR(255),
    [license_validity] NVARCHAR(255),
    [contact_person] NVARCHAR(255),
    [designation] NVARCHAR(255),
    [country_destination] NVARCHAR(255),
    [cd_contract_date] NVARCHAR(255),
    [cd_contract_terms] NVARCHAR(255),
    [cd_position] NVARCHAR(255),
    [cd_position_sub] NVARCHAR(255),
    [cd_position_others] NVARCHAR(255),
    [cd_yrs_as_seaman] NVARCHAR(255),
    [cd_contact_person] NVARCHAR(255),
    [cd_designation] NVARCHAR(255),
    [cd_salary] NVARCHAR(255),
    [cd_peso_conversion] NVARCHAR(255),
    [cd_allotment_amnt] NVARCHAR(255),
    [cd_allotment_sched] NVARCHAR(255),
    [cd_alottee] NVARCHAR(255),
    [cd_type_of_vessel] NVARCHAR(255),
    [cd_name_of_vessel] NVARCHAR(255),
    [cd_departure_date] NVARCHAR(255),
    [cd_employer] NVARCHAR(255),
    [cd_nature_of_company] NVARCHAR(255),
    [cd_contract_duration] NVARCHAR(255),
    [cd_yrs_in_present_company] NVARCHAR(255),
    [cd_remmit_amnt] NVARCHAR(255),
    [cd_remmit_sched] NVARCHAR(255),
    [cd_country] NVARCHAR(255),
    [cd_other_country] NVARCHAR(255),
    [cd_beneficiary] NVARCHAR(255),
    [cd_yrs_as_ofw] NVARCHAR(255),
    [business_name] NVARCHAR(255),
    [registered_owner] NVARCHAR(255),
    [type_of_ownership] NVARCHAR(255),
    [nature_of_business] NVARCHAR(255),
    [products] NVARCHAR(255),
    [ave_weekly_purchases] NVARCHAR(255),
    [rent_expenses] NVARCHAR(255),
    [est_daily_sales] NVARCHAR(255),
    [no_of_employees] NVARCHAR(255),
    [no_of_days_mo] NVARCHAR(255),
    [salary_head] NVARCHAR(255),
    [est_monthly_sales] NVARCHAR(255),
    [est_monthly_expense] NVARCHAR(255),
    [est_inventory] NVARCHAR(255),
    [mark_up] NVARCHAR(255),
    [complete_business_info] NVARCHAR(255),
    [est_monthly_income] NVARCHAR(255),
    [UDATE] INT NOT NULL,
    [DATE] DATETIME2 NOT NULL,
    CONSTRAINT [crm_soi_test_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [crm_soi_test_loan_profile_key] UNIQUE NONCLUSTERED ([loan_profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_course] (
    [id] INT NOT NULL IDENTITY(1,1),
    [course_code] VARCHAR(255) NOT NULL,
    [course_name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_crm_course_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crm_agents] (
    [aid] INT NOT NULL IDENTITY(1,1),
    [lastname] NVARCHAR(25) NOT NULL,
    [suffix] NVARCHAR(25) NOT NULL,
    [firstname] NVARCHAR(25) NOT NULL,
    [middlename] NVARCHAR(25) NOT NULL,
    [birthday] VARCHAR(60) NOT NULL,
    [gender] VARCHAR(60) NOT NULL,
    [date_reg] VARCHAR(60) NOT NULL,
    [relative] INT NOT NULL,
    [sponsor] INT NOT NULL,
    [status] VARCHAR(10) NOT NULL,
    [mobile] VARCHAR(100) NOT NULL,
    [telephone] VARCHAR(100) NOT NULL,
    [address] NVARCHAR(max) NOT NULL,
    [addedby] INT NOT NULL,
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL CONSTRAINT [DF__crm_agents__date__02925FBF] DEFAULT CURRENT_TIMESTAMP,
    [_deleted] INT NOT NULL,
    [sync] INT NOT NULL CONSTRAINT [DF__crm_agents__sync__038683F8] DEFAULT 0,
    [USER_ID_NUMBER] VARCHAR(200),
    [email] VARCHAR(100),
    [password] VARCHAR(64),
    [salt] VARCHAR(3),
    CONSTRAINT [PK_crm_agents_aid] PRIMARY KEY CLUSTERED ([aid])
);

-- CreateTable
CREATE TABLE [dbo].[crm_agency] (
    [id] INT NOT NULL IDENTITY(1,1),
    [agency_code] INT,
    [agency_name] NVARCHAR(255),
    CONSTRAINT [PK_crm_agency_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crm_manage_address] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [ZIP_CODE] NVARCHAR(255) NOT NULL,
    [PROVINCE] NVARCHAR(255) NOT NULL,
    [CITY] NVARCHAR(255) NOT NULL,
    [STATUS] INT NOT NULL CONSTRAINT [DF__crm_manag__STATU__0BE6BFCF] DEFAULT 0,
    [_DELETED] INT NOT NULL CONSTRAINT [DF__crm_manag___DELE__0CDAE408] DEFAULT 0,
    [DATE] DATETIME NOT NULL CONSTRAINT [DF__crm_manage__DATE__0DCF0841] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_crm_manage_address_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[crm_schools] (
    [id] INT NOT NULL IDENTITY(1,1),
    [school_name] VARCHAR(255) NOT NULL,
    CONSTRAINT [PK_crm_schools_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crm_collection_area] (
    [id] INT NOT NULL IDENTITY(1,1),
    [ZOND_CODE] VARCHAR(255) NOT NULL,
    [ZOND_AREACODE] VARCHAR(255) NOT NULL,
    [ZOND_AREANAME] NVARCHAR(255) NOT NULL,
    [STATUS] INT NOT NULL CONSTRAINT [DF__crm_colle__STATU__314D4EA8] DEFAULT 1,
    [_DELETED] INT NOT NULL CONSTRAINT [DF__crm_colle___DELE__324172E1] DEFAULT 0,
    CONSTRAINT [PK_crm_collection_area_id] PRIMARY KEY CLUSTERED ([id])
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
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[users]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[users]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[branch]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[areas]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_course]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_course]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [aid] ON [dbo].[crm_agents]([aid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [aid_2] ON [dbo].[crm_agents]([aid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [aid_3] ON [dbo].[crm_agents]([aid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_agency]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_agency]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_3] ON [dbo].[crm_agency]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[crm_manage_address]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[crm_manage_address]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_3] ON [dbo].[crm_manage_address]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_schools]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_schools]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_3] ON [dbo].[crm_schools]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_collection_area]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_collection_area]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_3] ON [dbo].[crm_collection_area]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[crm_business_type]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[crm_business_type]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pid] ON [dbo].[crm_product]([pid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [pid_2] ON [dbo].[crm_product]([pid]);

-- AddForeignKey
ALTER TABLE [dbo].[crm_product_test] ADD CONSTRAINT [crm_product_test_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[crm_client]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[crm_loans_test] ADD CONSTRAINT [crm_loans_test_clientId_fkey] FOREIGN KEY ([clientId]) REFERENCES [dbo].[crm_client]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[crm_loans_test] ADD CONSTRAINT [crm_loans_test_soiID_fkey] FOREIGN KEY ([soiID]) REFERENCES [dbo].[crm_soi_test]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
