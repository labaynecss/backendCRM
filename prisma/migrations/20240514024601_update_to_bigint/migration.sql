/*
  Warnings:

  - You are about to alter the column `mobile` on the `UserCredentials` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[UserCredentials] ALTER COLUMN [mobile] INT NOT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
