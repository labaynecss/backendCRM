@echo off
setlocal

REM Define source and destination
set "source=C:\Users\carl.labayne\Desktop\backendCRM\dist\*"
set "destination=\\CRM-DEV\crmapit"

REM Copy psexec.exe to a known location or include it in your PATH
set "psexec_path=C:\path\to\psexec.exe"

REM Use psexec to copy the files
"%psexec_path%" \\10.120.50.190 -u remote_user -p remote_password cmd /c xcopy "%source%" "%destination%" /Y /E /C /I

echo Files copied successfully!
endlocal