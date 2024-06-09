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
CREATE TABLE [dbo].[crm_borrowers_test] (
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
    [Reference] VARCHAR(60) NOT NULL,
    [Refer_address] VARCHAR(20) NOT NULL,
    [Refer_contact] VARCHAR(20) NOT NULL,
    [Refer_relation] VARCHAR(20) NOT NULL,
    [Reference1] VARCHAR(60) NOT NULL,
    [Refer_address1] VARCHAR(20) NOT NULL,
    [Refer_contact1] VARCHAR(20) NOT NULL,
    [Refer_relation1] VARCHAR(20) NOT NULL,
    CONSTRAINT [crm_borrowers_test_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [crm_borrowers_test_profile_key] UNIQUE NONCLUSTERED ([profile])
);

-- CreateTable
CREATE TABLE [dbo].[crm_client_test] (
    [id] INT NOT NULL IDENTITY(1,1),
    [facebook] NVARCHAR(145),
    [viber_skype] NVARCHAR(145),
    [civil_status] NVARCHAR(65) NOT NULL,
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
    [mobile1] NVARCHAR(20) NOT NULL,
    [mobile2] NVARCHAR(20) NOT NULL,
    [mobile3] NVARCHAR(20) NOT NULL,
    [telephone1] NVARCHAR(20) NOT NULL,
    [telephone2] NVARCHAR(20) NOT NULL,
    [telephone3] NVARCHAR(20) NOT NULL,
    [roaming_no] NVARCHAR(20) NOT NULL,
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
    CONSTRAINT [crm_client_test_pkey] PRIMARY KEY CLUSTERED ([id])
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

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
