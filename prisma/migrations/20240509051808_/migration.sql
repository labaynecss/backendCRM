BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User_Credentials] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(15) NOT NULL,
    [f_name] VARCHAR(50) NOT NULL,
    [l_name] VARCHAR(50) NOT NULL,
    [password] VARCHAR(50) NOT NULL,
    [email] VARCHAR(30) NOT NULL,
    [mobile] INT NOT NULL,
    [branch] VARCHAR(50) NOT NULL,
    [m_name] VARCHAR(50) NOT NULL,
    CONSTRAINT [User_Credentials_pkey] PRIMARY KEY CLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
