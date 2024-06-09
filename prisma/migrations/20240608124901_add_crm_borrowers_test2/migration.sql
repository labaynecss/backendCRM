/*
  Warnings:

  - Added the required column `borrowerId` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[crm_client_test] ADD [borrowerId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[crm_client_test] ADD CONSTRAINT [crm_client_test_borrowerId_fkey] FOREIGN KEY ([borrowerId]) REFERENCES [dbo].[crm_borrowers_test]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
