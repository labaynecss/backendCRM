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
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B619C77DE7B] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- CreateTable
CREATE TABLE [dbo].[crm_borrowers] (
    [ID] INT NOT NULL IDENTITY(1,1),
    [profile] VARCHAR(60) NOT NULL,
    [cloud_profile] VARCHAR(60) NOT NULL,
    [LEADS_PROFILE] VARCHAR(60) NOT NULL,
    [LATEST_ID] INT NOT NULL CONSTRAINT [DF__crm_borro__LATES__0C1BC9F9] DEFAULT 0,
    [BORR_LAST_NAME] VARCHAR(60) NOT NULL,
    [BORR_FIRST_NAME] VARCHAR(60) NOT NULL,
    [BORR_SUFFIX] VARCHAR(60) NOT NULL,
    [BORR_MIDDLE_NAME] VARCHAR(60) NOT NULL,
    [BorrowerAddress] VARCHAR(max),
    [City] VARCHAR(60) NOT NULL,
    [BirthDate] VARCHAR(60) NOT NULL,
    [a_code1] VARCHAR(20),
    [a_code2] VARCHAR(20),
    [a_code3] VARCHAR(20),
    [a_code4] VARCHAR(20),
    [a_code5] VARCHAR(20),
    [a_code6] VARCHAR(20),
    [TelephoneNo1] VARCHAR(15) NOT NULL,
    [TelephoneNo2] VARCHAR(15) NOT NULL,
    [TelephoneNo3] VARCHAR(15) NOT NULL,
    [TelephoneNo4] VARCHAR(15) NOT NULL,
    [TelephoneNo5] VARCHAR(15) NOT NULL,
    [TelephoneNo6] VARCHAR(15) NOT NULL,
    [MobileNo1] VARCHAR(20) NOT NULL,
    [MobileNo2] VARCHAR(20) NOT NULL,
    [MobileNo3] VARCHAR(20) NOT NULL,
    [MobileNo4] VARCHAR(20) NOT NULL,
    [MobileNo5] VARCHAR(20) NOT NULL,
    [MobileNo6] VARCHAR(20) NOT NULL,
    [a_code_app] VARCHAR(20),
    [New_contact] VARCHAR(100) NOT NULL,
    [Gender] VARCHAR(60) NOT NULL,
    [Spouse] VARCHAR(60) NOT NULL,
    [TIN] VARCHAR(60) NOT NULL,
    [SSS] VARCHAR(60) NOT NULL,
    [EmailAddress] VARCHAR(60) NOT NULL,
    [SourceOfFund] VARCHAR(60) NOT NULL,
    [IncomeRange] VARCHAR(60) NOT NULL,
    [BusinessName] VARCHAR(max),
    [BusinessType] VARCHAR(60) NOT NULL,
    [BusinessAddress] VARCHAR(max),
    [DateofDeparture] VARCHAR(60) NOT NULL,
    [RecruitmentAgency] VARCHAR(60) NOT NULL,
    [Position] VARCHAR(60) NOT NULL,
    [Country] VARCHAR(60) NOT NULL,
    [CoMaker] VARCHAR(60) NOT NULL,
    [CoMakerAddress] VARCHAR(max),
    [CoMaker1Contact] VARCHAR(20) NOT NULL,
    [CoBorrower] VARCHAR(60) NOT NULL,
    [CoBorrowerAddress] VARCHAR(max),
    [CoBorrower_amnt] VARCHAR(60) NOT NULL,
    [CoBorrower1Contact] VARCHAR(20) NOT NULL,
    [CoBorrower2] VARCHAR(60) NOT NULL,
    [CoBorrower2_Address] VARCHAR(max),
    [CoBorrower2_amnt] VARCHAR(60) NOT NULL,
    [CoBorrower2Contact] VARCHAR(20) NOT NULL,
    [CoBorrower3] VARCHAR(60) NOT NULL,
    [CoBorrower3_Address] VARCHAR(max),
    [CoBorrower3_amnt] VARCHAR(60) NOT NULL,
    [CoBorrower3Contact] VARCHAR(20) NOT NULL,
    [CoMaker2] VARCHAR(60) NOT NULL,
    [CoMaker2_Address] VARCHAR(max),
    [CoMaker2Contact] VARCHAR(15) NOT NULL,
    [CoMaker3] VARCHAR(60) NOT NULL,
    [CoMaker3_Address] VARCHAR(max),
    [CoMaker3Contact] VARCHAR(60) NOT NULL,
    [AssumeBy] VARCHAR(60) NOT NULL,
    [AssumeBy_Address] VARCHAR(max),
    [AssumeBy_ContactNo] VARCHAR(60) NOT NULL,
    [AssumeBy_Birthday] VARCHAR(60) NOT NULL,
    [Reference] VARCHAR(60) NOT NULL,
    [ReferTelNo] VARCHAR(15) NOT NULL,
    [ReferMobNo] VARCHAR(20) NOT NULL,
    [Ref2] VARCHAR(60) NOT NULL,
    [Ref2TelNo] VARCHAR(15) NOT NULL,
    [Ref2MobNo] VARCHAR(20) NOT NULL,
    [FILE_CREATED] INT NOT NULL CONSTRAINT [DF__crm_borro__FILE___13BCEBC1] DEFAULT 0,
    [SYNCHING] INT NOT NULL CONSTRAINT [DF__crm_borro__SYNCH__14B10FFA] DEFAULT 0,
    [UPDATE_ACC] INT NOT NULL CONSTRAINT [DF__crm_borro__UPDAT__15A53433] DEFAULT 0,
    [UPDATE_2] INT NOT NULL CONSTRAINT [DF__crm_borro__UPDAT__1699586C] DEFAULT 0,
    [UPDATE_3] INT NOT NULL CONSTRAINT [DF__crm_borro__UPDAT__178D7CA5] DEFAULT 0,
    [UPDATE_4] INT NOT NULL CONSTRAINT [DF__crm_borro__UPDAT__1881A0DE] DEFAULT 0,
    CONSTRAINT [PK_crm_borrowers_ID] PRIMARY KEY CLUSTERED ([ID])
);

-- CreateTable
CREATE TABLE [dbo].[crm_clients] (
    [cid] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    [avatar] NVARCHAR(max) NOT NULL,
    [firstname] NVARCHAR(180) NOT NULL,
    [middlename] NVARCHAR(180) NOT NULL,
    [lastname] NVARCHAR(180) NOT NULL,
    [suffix] NVARCHAR(20) NOT NULL,
    [birthday] NVARCHAR(45) NOT NULL,
    [age] INT NOT NULL,
    [gender] NVARCHAR(6) NOT NULL,
    [maiden] NVARCHAR(45) NOT NULL,
    [religion] NVARCHAR(45) NOT NULL,
    [civil_status] NVARCHAR(45) NOT NULL,
    [education] NVARCHAR(45) NOT NULL,
    [other_education] NVARCHAR(45) NOT NULL,
    [last_school] NVARCHAR(200) NOT NULL,
    [additional_information] NVARCHAR(45) NOT NULL,
    [year_graduated] NVARCHAR(45) NOT NULL,
    [address] NVARCHAR(max) NOT NULL,
    [area] INT NOT NULL,
    [home_owner] NVARCHAR(255) NOT NULL,
    [home_owner_rent] NVARCHAR(45) NOT NULL,
    [home_owner_free] NVARCHAR(45) NOT NULL,
    [address_stay] NVARCHAR(255) NOT NULL,
    [present_address] NVARCHAR(max) NOT NULL,
    [present_address_zipcode] NVARCHAR(255) NOT NULL,
    [present_address_stay] NVARCHAR(255) NOT NULL,
    [permanent_address] NVARCHAR(max) NOT NULL,
    [permanent_address_zipcode] NVARCHAR(255) NOT NULL,
    [permanent_address_stay] NVARCHAR(255) NOT NULL,
    [provincial_address] NVARCHAR(max) NOT NULL,
    [provincial_address_zipcode] NVARCHAR(255) NOT NULL,
    [provincial_address_stay] NVARCHAR(255) NOT NULL,
    [residence_remarks] NVARCHAR(max) NOT NULL,
    [a_code1] NVARCHAR(20) NOT NULL,
    [telephone1] NVARCHAR(20) NOT NULL,
    [telephone2] NVARCHAR(20) NOT NULL,
    [a_code2] NVARCHAR(20) NOT NULL,
    [telephone3] NVARCHAR(20) NOT NULL,
    [a_code3] NVARCHAR(20) NOT NULL,
    [mobile1] NVARCHAR(20) NOT NULL,
    [mobile2] NVARCHAR(20) NOT NULL,
    [mobile3] NVARCHAR(20) NOT NULL,
    [roaming_no] NVARCHAR(20) NOT NULL,
    [email] NVARCHAR(145) NOT NULL,
    [facebook] NVARCHAR(145) NOT NULL,
    [viber_skype] NVARCHAR(145) NOT NULL,
    [father_name] NVARCHAR(max) NOT NULL,
    [father_age] NVARCHAR(25) NOT NULL,
    [mother_name] NVARCHAR(max) NOT NULL,
    [mother_age] NVARCHAR(25) NOT NULL,
    [sss] NVARCHAR(45) NOT NULL,
    [tin] NVARCHAR(45) NOT NULL,
    [dti_sec_reg] NVARCHAR(255) NOT NULL,
    [pro_license] NVARCHAR(255) NOT NULL,
    [source_of_income] NVARCHAR(max),
    [spouse_lastname] NVARCHAR(45) NOT NULL,
    [spouse_firstname] NVARCHAR(45) NOT NULL,
    [spouse_middlename] NVARCHAR(45) NOT NULL,
    [spouse_suffix] NVARCHAR(55) NOT NULL,
    [spouse_gender] NVARCHAR(6) NOT NULL,
    [spouse_birthday] NVARCHAR(65) NOT NULL,
    [spouse_age] NVARCHAR(25) NOT NULL,
    [spouse_mobile_no] NVARCHAR(255) NOT NULL,
    [spouse_tel_no] NVARCHAR(255) NOT NULL,
    [spouse_provincial_address] NVARCHAR(max) NOT NULL,
    [spouse_education] NVARCHAR(45) NOT NULL,
    [spouse_other_education] NVARCHAR(45) NOT NULL,
    [spouse_course] NVARCHAR(200) NOT NULL,
    [spouse_last_school] NVARCHAR(200) NOT NULL,
    [spouse_additional_information] NVARCHAR(255) NOT NULL,
    [spouse_year_graduated] NVARCHAR(45) NOT NULL,
    [spouse_source_of_income] NVARCHAR(max),
    [spouse_employment_details] NVARCHAR(255) NOT NULL,
    [spouse_employ_status] NVARCHAR(45) NOT NULL,
    [spouse_employer_business_address] NVARCHAR(max) NOT NULL,
    [spouse_employer_business_name] NVARCHAR(255) NOT NULL,
    [spouse_monthly_income] NVARCHAR(255) NOT NULL,
    [spouse_other_income] NVARCHAR(255) NOT NULL,
    [spouse_dti_sec_reg] NVARCHAR(45) NOT NULL,
    [spouse_pro_license] NVARCHAR(65) NOT NULL,
    [spouse_sss] NVARCHAR(45) NOT NULL,
    [spouse_tin] NVARCHAR(45) NOT NULL,
    [spouse_prev_business_stay] NVARCHAR(45) NOT NULL,
    [spouse_prev_employer] NVARCHAR(45) NOT NULL,
    [spouse_prev_employer_business_address] NVARCHAR(max) NOT NULL,
    [spouse_business_contact] NVARCHAR(45) NOT NULL,
    [spouse_business_position] NVARCHAR(45) NOT NULL,
    [spouse_business_stay] NVARCHAR(45) NOT NULL,
    [pi_remarks] NVARCHAR(max) NOT NULL,
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL CONSTRAINT [DF__crm_client__date__2D7CBDC4] DEFAULT CURRENT_TIMESTAMP,
    [courseID] INT,
    CONSTRAINT [PK_crm_clients_cid] PRIMARY KEY CLUSTERED ([cid]),
    CONSTRAINT [crm_clients$profile_3] UNIQUE NONCLUSTERED ([profile])
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
CREATE TABLE [dbo].[crm_co_borrower] (
    [id] INT NOT NULL IDENTITY(1,1),
    [profile] NVARCHAR(25) NOT NULL,
    [cb_lastname] NVARCHAR(40) NOT NULL,
    [cb_firstname] NVARCHAR(50) NOT NULL,
    [cb_middlename] NVARCHAR(40) NOT NULL,
    [cb_suffix] NVARCHAR(20) NOT NULL,
    [relation] NVARCHAR(255) NOT NULL,
    [birth_date] NVARCHAR(255) NOT NULL,
    [age] NVARCHAR(255) NOT NULL,
    [address] NVARCHAR(255) NOT NULL,
    [contact_no] NVARCHAR(25) NOT NULL,
    [source_of_income] NVARCHAR(255) NOT NULL,
    [other_information] NVARCHAR(255) NOT NULL,
    [UDATE] NVARCHAR(16) NOT NULL,
    [DATE] DATETIME NOT NULL CONSTRAINT [DF__crm_co_bor__DATE__2E70E1FD] DEFAULT CURRENT_TIMESTAMP,
    [applied_amount] NVARCHAR(100) NOT NULL,
    CONSTRAINT [PK_crm_co_borrower_id] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[crm_loans] (
    [lid] INT NOT NULL IDENTITY(1,1),
    [directory] NVARCHAR(max) NOT NULL,
    [profile] NVARCHAR(25) NOT NULL,
    [cloud_profile] NVARCHAR(100) NOT NULL CONSTRAINT [DF__crm_loans__cloud__00750D23] DEFAULT 'N''0''',
    [loan_profile] NVARCHAR(45) NOT NULL,
    [mobile_app] INT NOT NULL CONSTRAINT [DF__crm_loans__mobil__0169315C] DEFAULT 0,
    [CREATE_BY_CLOUD] INT NOT NULL CONSTRAINT [DF__crm_loans__CREAT__025D5595] DEFAULT 0,
    [FILE_CREATED] INT NOT NULL CONSTRAINT [DF__crm_loans__FILE___035179CE] DEFAULT 0,
    [leads] INT NOT NULL CONSTRAINT [DF__crm_loans__leads__04459E07] DEFAULT 0,
    [loan_active] INT NOT NULL,
    [branch] NVARCHAR(45) NOT NULL,
    [agent] NVARCHAR(135) NOT NULL,
    [app_type] INT NOT NULL,
    [pn_number] NVARCHAR(100) NOT NULL,
    [personal_loan] NVARCHAR(65) NOT NULL,
    [prev_approval] NVARCHAR(65) NOT NULL,
    [prev_amount] NVARCHAR(65) NOT NULL,
    [payment_history] NVARCHAR(max) NOT NULL,
    [loan_terms] NVARCHAR(45) NOT NULL,
    [amount_applied] NVARCHAR(45) NOT NULL,
    [amount_recommended] NVARCHAR(45) NOT NULL,
    [amount_apporved] NVARCHAR(45) NOT NULL,
    [term_rate] NVARCHAR(255) NOT NULL,
    [interest_rate] NVARCHAR(45) NOT NULL,
    [purpose] NVARCHAR(45) NOT NULL,
    [payment_mode] NVARCHAR(45) NOT NULL,
    [other_income] NVARCHAR(45) NOT NULL,
    [pro_license] NVARCHAR(45) NOT NULL,
    [loan_recommendation] NVARCHAR(45) NOT NULL,
    [loan_final_approval] NVARCHAR(45) NOT NULL,
    [loan_approved_term] NVARCHAR(45) NOT NULL,
    [loan_interest_rate] NVARCHAR(45) NOT NULL,
    [loan_gp] NVARCHAR(45) NOT NULL,
    [scorecard] NVARCHAR(45) NOT NULL,
    [other_text] NVARCHAR(255) NOT NULL,
    [added_score] NVARCHAR(45) NOT NULL,
    [monthly_amort] NVARCHAR(45) NOT NULL,
    [estimated_amort_terms] NVARCHAR(45) NOT NULL,
    [doc_submitted] NVARCHAR(45) NOT NULL,
    [security_support] NVARCHAR(45) NOT NULL,
    [released] INT NOT NULL,
    [release_udate] INT NOT NULL,
    [owner] INT NOT NULL,
    [telemarketer] INT NOT NULL,
    [src] INT NOT NULL,
    [active_department] NVARCHAR(45) NOT NULL,
    [department_status] NVARCHAR(45) NOT NULL,
    [remarks_crd_require_1] INT NOT NULL,
    [remarks_crd_require_2] INT NOT NULL,
    [remarks_crd_require_3] INT NOT NULL,
    [remarks_crd_require_4] INT NOT NULL,
    [remarks_crd_require_5] INT NOT NULL,
    [remarks_crd_require_6] INT NOT NULL,
    [remarks_crd_confirm_1] INT NOT NULL,
    [remarks_crd_confirm_2] INT NOT NULL,
    [remarks_crd_confirm_3] INT NOT NULL,
    [remarks_crd_confirm_4] INT NOT NULL,
    [remarks_crd_confirm_5] INT NOT NULL,
    [remarks_crd_confirm_6] INT NOT NULL,
    [remarks_crd_confirm_7] INT NOT NULL,
    [remarks_crd_confirm_8] INT NOT NULL,
    [company_background] NVARCHAR(max) NOT NULL,
    [other_source_name] NVARCHAR(255) NOT NULL,
    [other_source_nature] NVARCHAR(255) NOT NULL,
    [other_source_address] NVARCHAR(255) NOT NULL,
    [other_source_length] NVARCHAR(255) NOT NULL,
    [other_source_ownrented] NVARCHAR(255) NOT NULL,
    [other_source_contract] NVARCHAR(255) NOT NULL,
    [other_source_monthlyincome] NVARCHAR(255) NOT NULL,
    [other_source_of_income] NVARCHAR(max) NOT NULL,
    [collateral_registered_owner] NVARCHAR(255) NOT NULL,
    [collateral_tct] NVARCHAR(255) NOT NULL,
    [collateral_location] NVARCHAR(255) NOT NULL,
    [collateral_locality] NVARCHAR(255) NOT NULL,
    [collateral_land_value] NVARCHAR(255) NOT NULL,
    [collateral_spouse_name] NVARCHAR(255) NOT NULL,
    [collateral_improvements] NVARCHAR(255) NOT NULL,
    [collateral_total_appraised] NVARCHAR(255) NOT NULL,
    [collateral_30_appraised] NVARCHAR(255) NOT NULL,
    [collateral_reference] NVARCHAR(255) NOT NULL,
    [collateral_remarks] NVARCHAR(255) NOT NULL,
    [court_checking] NVARCHAR(max) NOT NULL,
    [bank_checking_branch] NVARCHAR(255) NOT NULL,
    [bank_checking_tel] NVARCHAR(255) NOT NULL,
    [bank_checking_sa] NVARCHAR(255) NOT NULL,
    [bank_checking_remarks] NVARCHAR(255) NOT NULL,
    [residence] NVARCHAR(max) NOT NULL,
    [neighbourhood_checking] NVARCHAR(max) NOT NULL,
    [other_information] NVARCHAR(max) NOT NULL,
    [assets] NVARCHAR(max) NOT NULL,
    [strength] NVARCHAR(max) NOT NULL,
    [weakness] NVARCHAR(max) NOT NULL,
    [crd_remarks] NVARCHAR(max) NOT NULL,
    [crecom_remarks] NVARCHAR(max) NOT NULL,
    [action_ao_name] NVARCHAR(255) NOT NULL,
    [action_ao_mobile] NVARCHAR(255) NOT NULL,
    [action_ao_date] NVARCHAR(255) NOT NULL,
    [action_bm_name] NVARCHAR(255) NOT NULL,
    [action_bm_mobile] NVARCHAR(255) NOT NULL,
    [action_bm_date] NVARCHAR(255) NOT NULL,
    [action_crecom] NVARCHAR(255) NOT NULL,
    [action_crecom_final] NVARCHAR(255) NOT NULL,
    [action_crd] NVARCHAR(255) NOT NULL,
    [assigned_ao] NVARCHAR(255) NOT NULL,
    [waivers_remarks] NVARCHAR(max) NOT NULL,
    [DEP_STAT] NVARCHAR(35) NOT NULL CONSTRAINT [DF__crm_loans__DEP_S__0539C240] DEFAULT 'N''1;0;0;0;0;0;0;0;0''',
    [COM_PROD] NVARCHAR(25) NOT NULL CONSTRAINT [DF__crm_loans__COM_P__062DE679] DEFAULT 'N''0;0;0''',
    [COMPANY] INT NOT NULL,
    [PRODUCT] INT NOT NULL,
    [RAW_PRODUCT] NVARCHAR(10) NOT NULL,
    [CAM] INT NOT NULL,
    [SOI] INT NOT NULL,
    [RAW_SOI] NVARCHAR(10) NOT NULL,
    [STATE] INT NOT NULL CONSTRAINT [DF__crm_loans__STATE__07220AB2] DEFAULT 0,
    [ACCESS_BY] NVARCHAR(255) NOT NULL,
    [LOCK_ACCESS] NVARCHAR(255) NOT NULL,
    [LOCK_HEAD] NVARCHAR(255) NOT NULL,
    [CRECOM_ACCESS] INT CONSTRAINT [DF__crm_loans__CRECO__08162EEB] DEFAULT 0,
    [EXCOM_ACCESS] INT NOT NULL CONSTRAINT [DF__crm_loans__EXCOM__090A5324] DEFAULT 0,
    [ACCESS_TOOL] INT NOT NULL CONSTRAINT [DF__crm_loans__ACCES__09FE775D] DEFAULT 0,
    [CRD_ACCESS] NVARCHAR(255) NOT NULL,
    [udate] INT NOT NULL,
    [date] DATETIME NOT NULL CONSTRAINT [DF__crm_loans__date__0AF29B96] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [PK_crm_loans_lid] PRIMARY KEY CLUSTERED ([lid]),
    CONSTRAINT [crm_loans$loan_profile_3] UNIQUE NONCLUSTERED ([loan_profile])
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

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[users]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[users]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[branch]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[areas]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cloud_profile] ON [dbo].[crm_borrowers]([cloud_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID] ON [dbo].[crm_borrowers]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ID_2] ON [dbo].[crm_borrowers]([ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [LATEST_ID] ON [dbo].[crm_borrowers]([LATEST_ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [LATEST_ID_2] ON [dbo].[crm_borrowers]([LATEST_ID]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [LEADS_PROFILE] ON [dbo].[crm_borrowers]([LEADS_PROFILE]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile] ON [dbo].[crm_borrowers]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_2] ON [dbo].[crm_borrowers]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_3] ON [dbo].[crm_borrowers]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cid] ON [dbo].[crm_clients]([cid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cid_2] ON [dbo].[crm_clients]([cid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cid_3] ON [dbo].[crm_clients]([cid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cid_4] ON [dbo].[crm_clients]([cid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [firstname] ON [dbo].[crm_clients]([firstname]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [firstname_2] ON [dbo].[crm_clients]([firstname]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lastname] ON [dbo].[crm_clients]([lastname]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lastname_2] ON [dbo].[crm_clients]([lastname]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [middlename] ON [dbo].[crm_clients]([middlename]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile] ON [dbo].[crm_clients]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_2] ON [dbo].[crm_clients]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_4] ON [dbo].[crm_clients]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_5] ON [dbo].[crm_clients]([profile]);

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
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_co_borrower]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_co_borrower]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_3] ON [dbo].[crm_co_borrower]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile] ON [dbo].[crm_co_borrower]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_2] ON [dbo].[crm_co_borrower]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ACCESS_BY] ON [dbo].[crm_loans]([ACCESS_BY]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [cloud_profile] ON [dbo].[crm_loans]([cloud_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [COM_PROD] ON [dbo].[crm_loans]([COM_PROD]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lid] ON [dbo].[crm_loans]([lid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lid_2] ON [dbo].[crm_loans]([lid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lid_3] ON [dbo].[crm_loans]([lid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [lid_4] ON [dbo].[crm_loans]([lid]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [loan_profile] ON [dbo].[crm_loans]([loan_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [loan_profile_2] ON [dbo].[crm_loans]([loan_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [loan_profile_4] ON [dbo].[crm_loans]([loan_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [loan_profile_5] ON [dbo].[crm_loans]([loan_profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile] ON [dbo].[crm_loans]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_2] ON [dbo].[crm_loans]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_3] ON [dbo].[crm_loans]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [profile_4] ON [dbo].[crm_loans]([profile]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [STATE] ON [dbo].[crm_loans]([STATE]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id] ON [dbo].[crm_collection_area]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_2] ON [dbo].[crm_collection_area]([id]);

-- CreateIndex
CREATE NONCLUSTERED INDEX [id_3] ON [dbo].[crm_collection_area]([id]);

-- AddForeignKey
ALTER TABLE [dbo].[crm_clients] ADD CONSTRAINT [crm_clients_courseID_fkey] FOREIGN KEY ([courseID]) REFERENCES [dbo].[crm_course]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
