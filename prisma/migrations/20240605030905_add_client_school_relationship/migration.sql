/*
  Warnings:

  - You are about to drop the column `last_school` on the `crm_clients` table. All the data in the column will be lost.
  - Added the required column `lastschoolId` to the `crm_clients` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[crm_clients] DROP COLUMN [last_school];
ALTER TABLE [dbo].[crm_clients] ADD [lastschoolId] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[crm_clients] ADD CONSTRAINT [crm_clients_lastschoolId_fkey] FOREIGN KEY ([lastschoolId]) REFERENCES [dbo].[crm_schools]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
