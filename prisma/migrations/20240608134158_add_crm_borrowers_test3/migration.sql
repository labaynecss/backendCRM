/*
  Warnings:

  - A unique constraint covering the columns `[profile]` on the table `crm_client_test` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `birthday` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `middlename` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sss` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tin` to the `crm_client_test` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[crm_client_test] ADD [age] NVARCHAR(45),
[birthday] NVARCHAR(45) NOT NULL,
[email] NVARCHAR(145) NOT NULL,
[firstname] NVARCHAR(180) NOT NULL,
[gender] NVARCHAR(45) NOT NULL,
[lastname] NVARCHAR(180) NOT NULL,
[middlename] NVARCHAR(180) NOT NULL,
[profile] NVARCHAR(1000) NOT NULL,
[sss] NVARCHAR(45) NOT NULL,
[suffix] NVARCHAR(20),
[tin] NVARCHAR(65) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[crm_client_test] ADD CONSTRAINT [crm_client_test_profile_key] UNIQUE NONCLUSTERED ([profile]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
