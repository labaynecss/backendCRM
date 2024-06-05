/*
  Warnings:

  - You are about to drop the column `area` on the `crm_clients` table. All the data in the column will be lost.
  - Added the required column `areaID` to the `crm_clients` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[crm_clients] DROP COLUMN [area];
ALTER TABLE [dbo].[crm_clients] ADD [areaID] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[crm_clients] ADD CONSTRAINT [crm_clients_areaID_fkey] FOREIGN KEY ([areaID]) REFERENCES [dbo].[crm_collection_area]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
