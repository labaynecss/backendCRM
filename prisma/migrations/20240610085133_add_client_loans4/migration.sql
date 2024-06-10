/*
  Warnings:

  - A unique constraint covering the columns `[profile]` on the table `crm_client` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[crm_client] ADD CONSTRAINT [crm_client_profile_key] UNIQUE NONCLUSTERED ([profile]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
