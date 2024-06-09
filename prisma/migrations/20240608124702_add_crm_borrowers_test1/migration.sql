BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_address] VARCHAR(70) NOT NULL;
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_contact] VARCHAR(70) NOT NULL;
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_relation] VARCHAR(70) NOT NULL;
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_address1] VARCHAR(70) NOT NULL;
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_contact1] VARCHAR(70) NOT NULL;
ALTER TABLE [dbo].[crm_borrowers_test] ALTER COLUMN [Refer_relation1] VARCHAR(70) NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
