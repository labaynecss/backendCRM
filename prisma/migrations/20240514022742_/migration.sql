BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserCredentials] (
    [id] INT NOT NULL IDENTITY(1,1),
    [username] VARCHAR(20) NOT NULL,
    [f_name] VARCHAR(20) NOT NULL,
    [l_name] VARCHAR(20) NOT NULL,
    [password] VARCHAR(100) NOT NULL,
    [email] VARCHAR(100) NOT NULL,
    [mobile] BIGINT NOT NULL,
    [branch] VARCHAR(20) NOT NULL,
    [m_name] VARCHAR(20) NOT NULL,
    CONSTRAINT [UserCredentials_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserCredentials_username_key] UNIQUE NONCLUSTERED ([username])
);

-- CreateTable
CREATE TABLE [dbo].[Token] (
    [id] INT NOT NULL IDENTITY(1,1),
    [token] NVARCHAR(1000) NOT NULL,
    [userId] INT NOT NULL,
    [expirationTime] DATETIME2 NOT NULL,
    CONSTRAINT [Token_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [Token_token_key] UNIQUE NONCLUSTERED ([token])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Token_userId_idx] ON [dbo].[Token]([userId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
