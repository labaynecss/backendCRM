@echo off

REM Define username and password
set "username=safc.com.ph\sacfit"
set "password=adm@1Ts@fc"

REM Attempt to map the network drive
net use x: \\CRM-DEV\dist /user:%username% %password% /persistent:yes

REM Check if the drive was mapped successfully
if %ERRORLEVEL% neq 0 (
    echo Failed to map the network drive
    goto end
)

echo Network drive mapped successfully.

:end
pause
